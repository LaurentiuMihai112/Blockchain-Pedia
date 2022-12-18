import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelComparator} from "../blockchain-model-comparator";

export class MarketCapComparator implements BlockchainModelComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number {
        let valueOne = blockchainOne.marketCap;
        let valueTwo = blockchainTwo.marketCap;

        if (valueOne > valueTwo) {
            return 1;
        }

        if (valueOne < valueTwo) {
            return -1;
        }

        return 0;
    }
}