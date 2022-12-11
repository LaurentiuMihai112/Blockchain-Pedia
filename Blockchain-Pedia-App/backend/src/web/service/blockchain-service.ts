import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainRuntimeCachedData} from "../../utils/blockchain-runtime-cached-data"

export class BlockchainService {
    public static async findAll(): Promise<BlockchainModel[]> {
        return await BlockchainRuntimeCachedData.getData()
    }
}