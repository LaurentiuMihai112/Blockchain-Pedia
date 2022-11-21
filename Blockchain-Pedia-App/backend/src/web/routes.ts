import {Express} from "express";
import {Endpoints} from "./endpoints";
import {BlockchainController} from "./controller/blockchain-controller";
import {logRequestMiddleware} from "./middleware/logging-middleware";

export default function (app: Express) {

    // Get the list of Blockchains
    app.get(Endpoints.BLOCKCHAINS, logRequestMiddleware, BlockchainController.getAllBlockchains);

}