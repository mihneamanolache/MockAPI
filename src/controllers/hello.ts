import { Request, Response } from "express";

/**
 * Express middleware to handle a simple endpoint that responds with a JSON object.
 *
 * @param { Request }   _req    - The Express request object (unused in this handler).
 * @param { Response }  res     - The Express response object.
 *
 * @returns { void } - This function does not return a value.
 */
export default function (_req: Request, res: Response): Response<any, Record<string, any>> {
    return res.json({
        hello: "world",
        api_version: process.env.npm_package_version
    });
}
