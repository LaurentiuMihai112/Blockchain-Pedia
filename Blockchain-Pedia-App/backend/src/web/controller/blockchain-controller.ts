import {NextFunction, Request, Response} from "express";
import {BlockchainService} from "../service/blockchain-service";

export class BlockchainController {

    public static hello = (req: Request, res: Response, next: NextFunction): void => {
        let message = BlockchainService.sayHello();

        res.setHeader('Content-Type', 'text/plain');
        res.send(message);
    };

    public static getAllEntities = (req: Request, res: Response, next: NextFunction): object => {
        return Object;
    }
}