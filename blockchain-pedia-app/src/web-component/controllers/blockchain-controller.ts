import {NextFunction, Request, Response} from "express";

export class BlockchainController {

    public static hello = (req: Request, res: Response, next: NextFunction): void => {
        try {
            res.setHeader('Content-Type', 'text/plain');
            res.send('Hello from Express + TypeScript Server');
        } catch (error) {
            next(error);
        }
    };
    public static getAllEntities = (req: Request, res: Response, next: NextFunction): object => {
        return Object;
    }
}