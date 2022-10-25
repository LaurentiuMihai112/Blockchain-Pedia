import {NextFunction, Request, Response,} from "express";

export class ErrorHandlerMiddleware {
    static handleError(err: ResponseError, req: Request<any>, res: Response, next: NextFunction) {
        console.log(err);
    }
}

export class ResponseError extends Error {
    constructor(public message: string, public status: number = 500) {
        super(message);
    }
}