import {BlockchainSpec} from "../blockchain-spec";
import {BlockchainModel} from "../../model/blockchain-model";

export class PowerConsumptionSpec implements BlockchainSpec {
    private minValue: number;
    private maxValue: number;

    constructor(minValue: number, maxValue: number) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    isSatisfied(blockchain: BlockchainModel): boolean {
        return blockchain.powerConsumption >= this.minValue && blockchain.powerConsumption <= this.maxValue;
    }

}