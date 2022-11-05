import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelComparator} from "../blockchain-model-comparator";

export class TransactionCountComparator implements BlockchainModelComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number {
        let valueOne = blockchainOne.transactionCount;
        let valueTwo = blockchainTwo.transactionCount;

        if(valueOne > valueTwo) {
            return 1;
        }

        if(valueOne < valueTwo) {
            return -1;
        }

        return 0;
    }

}

