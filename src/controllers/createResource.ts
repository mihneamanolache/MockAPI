import { NextFunction, Request, Response } from "express";

import knex from "../utils/knex";
import { IResource } from "../utils/types/IResource";
import { Generator } from "../utils/lib/Generator";

/**
 *  Express middleware to handle the creation of a resource using the provided payload.
 *
 *  @param { Request }      req         - The Express request object.
 *  @param { Response }     res         - The Express response object.
 *  @param { NextFunction } _next       - The next middleware function (unused in this handler).
 *  @param { Generator }    generator   - An instance of the Generator class for schema validation.
 *  
 *  @returns {Promise<void>} - A Promise resolving to undefined.
 */
export default async function (req: Request, res: Response, _next: NextFunction, generator: Generator): Promise<Response<any, Record<string, any>>> {
    /**
     *  The payload containing the resource data.
     *  @type { IResource }
     */
    const payload: IResource = { ...req.body };
    try {
        /**
         *  Throw an error if the payload is empty.
         */
        if ( Object.keys(payload).length === 0 ) throw new Error("Invalid schema. Schema must have at least 1 key!"); 
        /**
         *  Validate the payload schema using the generator and insert into table
         */
        generator.check_schema(payload.schema);
        await knex("routes").insert(payload);

        return res.json({ success: "Resource created successfully!" });
    } catch ( e: unknown ) {
        return res.status(500).json({ error: (<Error>e).message });
    }
}
