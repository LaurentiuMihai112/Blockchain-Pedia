import {Express, Request, Response} from "express";
import {BlockchainController} from "./controller/blockchain-controller";

export default function (app: Express){

    // Get the list of Blockchains
    app.get("/blockchains", (req: Request, res:Response) => res.sendStatus(200));
    //app.get("/blockchains",BlockchainController.hello)
}