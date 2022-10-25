import {BlockchainModel} from "../../model/blockchain-model";

class BlockchainRepository {
    private static _instance: BlockchainRepository = new BlockchainRepository()

    private BlockchainRepository() {}

    public static getInstance(): BlockchainRepository {
        return this._instance
    }

    public findAll(): BlockchainModel[] {
        return []
    }
}