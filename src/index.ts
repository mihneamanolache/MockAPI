import express, { Express } from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "compression";

import hello from "./controllers/hello";
import processor from "./controllers/processor";
import checkTypes from "./controllers/checkTypes";
import { Generator } from "./utils/lib/Generator";
import checkSchema from "./controllers/checkSchema";
import createResource from "./controllers/createResource";

/** Create new MockAPI Generator */
const generator: Generator = new Generator();

/** Create new Express app */
const app:  Express = express();
/** Enable cookie parsing */
app.use(cookieParser());
/** Allows us to receive requests with data in json format */
app.use(bodyParser.json({ limit: "2mb" }));
/** Allows us to receive requests with data in x-www-form-urlencoded format */
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
/** Allows us to receive requests with data in text/plain format */
app.use(bodyParser.text({ limit: "2mb", type: "text/plain" }));
/** Enable CORS */
app.use(cors());
/** Compress all responses */
app.use(compression());
/** Prettify json */
app.set("json spaces", 2);

/** 
 * Create routes
 *  - "/"               { GET }     : generic 'hello world' response
 *  - "/getTypes"       { GET }     : returnes available types
 *  - "/checkSchema"    { POST }    : tests schema of your mocked response
 *  - "/createEndpoint" { POST }    : creates a new mock API route (resource)   
 */
app.get("/", hello);
app.get("/getTypes", (req, res, _next) => checkTypes(req, res, _next, generator));
app.post("/checkSchema", (req, res, _next) => checkSchema(req, res, _next, generator));
app.post("/createEndpoint", (req, res, _next) => createResource(req, res, _next, generator));
/** This route handles all routes created with `/createResource` */
app.all("/*", (req, res, _next) => processor(req, res, _next, generator));

/** Set port and start server */
const port: number = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Application is running on port ${port}.`);
});
