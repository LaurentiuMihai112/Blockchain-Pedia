import {BlockchainModel} from "../model/blockchain-model";
import {BlockchainModelComparator} from "./blockchain-model-comparator";

export class BlockchainSorter {
    public sortAscending(blockchainList: BlockchainModel[], comparator: BlockchainModelComparator): BlockchainModel[] {
        return blockchainList.sort((a, b) => comparator.compare(a, b))
    }

    public sortDescending(blockchainList: BlockchainModel[], comparator: BlockchainModelComparator): BlockchainModel[] {
        return this.sortAscending(blockchainList, comparator).reverse()
    }
}