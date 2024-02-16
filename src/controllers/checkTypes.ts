import { NextFunction, Request, Response } from "express";
import { Generator } from "../utils/lib/Generator";

/**
 *  Express middleware to handle the retrieval of allowed types from the generator.
 *
 *  @param { Request }      _req        - The Express request object (unused in this handler).
 *  @param { Response }     res         - The Express response object.
 *  @param { NextFunction } _next       - The next middleware function (unused in this handler).
 *  @param { Generator }    generator   - An instance of the Generator class.
 *
 *  @returns { void } - This function does not return a value.
 */
export default function ( _req: Request, res: Response, _next: NextFunction, generator: Generator ): Response<any, Record<string, any>> {
    try {
        /**
         *  Respond with the allowed types from the generator. (all types allowd by @faker-js/faker)
         */
        return res.json({ types: generator.get_allowed_types });
    } catch ( e: unknown ) {
        return res.json({ error: (<Error>e).message});
    }
}
