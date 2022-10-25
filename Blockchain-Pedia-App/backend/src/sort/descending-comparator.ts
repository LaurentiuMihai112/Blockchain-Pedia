import {BlockchainModel} from "../model/blockchain-model";

export interface DescendingComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number
}