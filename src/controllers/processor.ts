import { NextFunction, Request, Response } from "express";
import knex from "../utils/knex";
import { Generator } from "../utils/lib/Generator";
import _ from "lodash";

/**
 * Express middleware to handle dynamic route endpoints.
 *
 * @param { Request }       req         - The Express request object.
 * @param { Response }      res         - The Express response object.
 * @param { NextFunction }  _next       - The next middleware function.
 * @param { Generator }     generator   - An instance of the MockApi Generator class.
 *
 * @returns {Promise<void>} - A Promise resolving to undefined.
 */
export default async function (
    req: Request,
    res: Response,
    _next: NextFunction,
    generator: Generator
): Promise<Response<any, Record<string, any>>> {
    /**
     *  Extract the dynamic endpoint from the request parameters.
     */
    const endpoint: string = req.params["0"];
    try {
        /** 
         *  Retrieve the resource information from the database. 
         */
        const resource: any = await knex("routes")
            .where({ name: endpoint, method: req.method })
            .first();
        /**
         *  Handle case where the resource is not found.
         */
        if ( !resource ) {
            try {
                /**
                 *  Attempt to find related endpoints for better error response.
                 *  i.e. You accessed /zo, but endpont is /zoo
                 */
                const related: any = await knex("routes")
                    .select("name", knex.raw("GROUP_CONCAT(method) as methods"))
                    .andWhere("name", "like", `%${endpoint.endsWith("/") ? req.params["0"].slice(0, -1) : req.params["0"]}%`)
                    .groupBy("name")
                    .first();
                res.status(404).json({
                    error: `Invalid endpoint: [${req.method}] /${endpoint}`,
                    related,
                });
            } catch {
                res.status(404).json({
                    error: `Invalid endpoint: [${req.method}] /${endpoint}`,
                });
            }
        }
        /**
         *  Build mock data using schema. If resource is a list, will generate 10 instances of it
         */
        const schema: JSON = JSON.parse(resource.schema);
        let response: any;
        if (resource.is_list) {
            response = [];
            for (let i: number = 0; i < 10; i++) {
                const sch: JSON = _.cloneDeep(schema);
                response.push(generator.generate(sch));
            }
        } else { response = generator.generate(schema); }
        /** 
         *  Respond with the generated data and status code from the resource. 
         */
        return res.status(resource.status_code || 200).json(response);
    } catch (e: any) {
        return res.status(500).json({
            error: e.message,
        });
    }
}
