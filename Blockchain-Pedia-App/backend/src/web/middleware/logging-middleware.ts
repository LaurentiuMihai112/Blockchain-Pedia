import {NextFunction, Request, Response} from "express";

export const logRequestMiddleware = (req: Request<any>, res: Response, next: NextFunction) => {
    console.log("Request Body: ", req.body);
    console.log("Request Headers: ", req.body);
    console.log("Request Query: ", req.query);
    console.log("Request URL: ", req.url);

    next();
}