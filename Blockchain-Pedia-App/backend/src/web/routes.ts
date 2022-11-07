import {Express} from "express";
import {Endpoints} from "./endpoints";
import {BlockchainController} from "./controller/blockchain-controller";

export default function (app: Express) {

    // Get the list of Blockchains
    app.get(Endpoints.BLOCKCHAINS, BlockchainController.getAllBlockchains);

}