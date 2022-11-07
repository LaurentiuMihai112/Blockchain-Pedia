import {BlockchainModel} from "../model/blockchain-model";
import {BlockchainSpec} from "./blockchain-spec";

export class BlockchainFilter {
    public filter(blockchainList: BlockchainModel[], blockchainSpec: BlockchainSpec): BlockchainModel[] {
        return blockchainList.filter((a)=> blockchainSpec.isSatisfied(a))
    }
}