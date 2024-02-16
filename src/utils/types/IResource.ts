/**
 *  Handles creation of new API resource (aka. endpoint).
 *      - name:         route name (i.e. http://localhost:<PORT>/newRoute)
 *      - method:       HTTP method for the route created
 *      - schema:       response JSON schema
 *      - is_list:      is the response expected to be a list of `schema` (optional)
 *      - status_code:  HTTP status code your resource should return (i.e. 200, 404 etc)
 */
export interface IResource {
    name:           string;
    method?:        HttpMethod;
    schema:         JSON;
    is_list?:       boolean;
    status_code:    number
}

export enum HttpMethod {
    GET     = "GET",
    POST    = "POST",
    PUT     = "PUT",
    PATCH   = "PATCH",
    DELETE  = "DELETE",
    HEAD    = "HEAD",
    OPTIONS = "OPTIONS",
    CONNECT = "CONNECT",
    TRACE   = "TRACE",
}
