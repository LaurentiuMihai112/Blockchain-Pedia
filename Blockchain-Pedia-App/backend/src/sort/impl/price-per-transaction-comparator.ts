import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelComparator} from "../blockchain-model-comparator";

export class PricePerTransactionComparator implements BlockchainModelComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number {
        let valueOne = blockchainOne.pricePerTransaction;
        let valueTwo = blockchainTwo.pricePerTransaction;

        if (valueOne > valueTwo) {
            return 1;
        }

        if (valueOne < valueTwo) {
            return -1;
        }

        return 0;
    }

}