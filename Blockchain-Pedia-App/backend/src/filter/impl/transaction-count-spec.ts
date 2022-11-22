import {BlockchainSpec} from "../blockchain-spec";
import {BlockchainModel} from "../../model/blockchain-model";

export class TransactionCountSpec implements BlockchainSpec {
    private minValue: number;
    private maxValue: number;

    constructor(minValue: number, maxValue: number) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    isSatisfied(blockchain: BlockchainModel): boolean {
        return blockchain.transactionCount >= this.minValue && blockchain.transactionCount <= this.maxValue;
    }

}