import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelComparator} from "../blockchain-model-comparator";

export class PowerConsumptionComparator implements BlockchainModelComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number {
        let valueOne = blockchainOne.powerConsumption;
        let valueTwo = blockchainTwo.powerConsumption;

        if(valueOne > valueTwo) {
            return 1;
        }

        if(valueOne < valueTwo) {
            return -1;
        }

        return 0;
    }

}