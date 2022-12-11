import {NextFunction, Request, Response,} from "express";

export const handleError = (err: TypeError | CustomError, req: Request<any>, res: Response, next: NextFunction) => {
    console.log("Middleware Error Handling\n");
    if (res.headersSent) {
        return next(err)
    }
    if (err instanceof CustomError) {
        console.log(err)
        const errStatus = err.statusCode || 500;

        const errMsg = err.message || 'Something went wrong';
        res.status(errStatus).send(JSON.stringify({
            'success': 'false',
            'status': errStatus,
            'message': errMsg
        })).end()
    } else {
        console.log(err)
        res.status(500).send("Something went wrong").end()
    }
}

export class CustomError {
    message: string;
    statusCode: number;
    additionalInfo: any;

    constructor(message: string, statusCode: number = 500, additionalInfo: any = {}) {
        this.message = message;
        this.statusCode = statusCode;
        this.additionalInfo = additionalInfo
    }
}