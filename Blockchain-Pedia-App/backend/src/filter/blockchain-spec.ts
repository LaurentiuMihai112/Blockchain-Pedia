import {BlockchainModel} from "../model/blockchain-model";

export interface BlockchainSpec {
    isSatisfied(blockchain: BlockchainModel): boolean
}