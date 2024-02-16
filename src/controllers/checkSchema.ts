import { NextFunction, Request, Response } from "express";
import { Generator } from "../utils/lib/Generator";

/**
 *  Express middleware to validate a schema using the generator.
 *
 *  @param { Request }      req         - The Express request object containing the schema in the request body.
 *  @param { Response }     res         - The Express response object.
 *  @param { NextFunction } _next       - The next middleware function (unused in this handler).
 *  @param { Generator }    generator   - An instance of the Generator class for schema validation.
 *  
 *  @returns {void} - This function does not return a value.
 */
export default function (req: Request, res: Response, _next: NextFunction, generator: Generator): Response<any, Record<string, any>> {
    try {
        return res.json({valid: generator.check_schema(req.body)});
    } catch (e:any) {
        return res.json({valid: false, error: e.message});
    }
}
