import {BlockchainModel} from "../model/blockchain-model";

export interface BlockchainModelComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number
}