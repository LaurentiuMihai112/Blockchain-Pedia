import {BlockchainModel} from "../model/blockchain-model";

export interface AscendingComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number
}