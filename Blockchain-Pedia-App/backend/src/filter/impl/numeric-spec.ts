import {BlockchainSpec} from "../blockchain-spec";
import {BlockchainModel} from "../../model/blockchain-model";

export class NumericSpec implements BlockchainSpec {
    private readonly minValue: number;
    private readonly maxValue: number;
    private readonly key: keyof BlockchainModel;

    constructor(minValue: number, maxValue: number, key: keyof BlockchainModel) {
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.key = key;
    }

    isSatisfied(blockchain: BlockchainModel): boolean {
        if (this.minValue === -1 && this.maxValue === -1) {
            return true;
        }

        if (this.minValue === -1) {
            return blockchain[this.key] <= this.maxValue;
        }

        if (this.maxValue === -1) {
            return blockchain[this.key] >= this.minValue;
        }

        return blockchain[this.key] >= this.minValue && blockchain[this.key] <= this.maxValue;
    }

}