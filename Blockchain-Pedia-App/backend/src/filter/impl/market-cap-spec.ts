import {BlockchainSpec} from "../blockchain-spec";
import {BlockchainModel} from "../../model/blockchain-model";

export class MarketCapSpec implements BlockchainSpec {
    private readonly minValue: number;
    private readonly maxValue: number;

    constructor(minValue: number, maxValue: number) {
        this.minValue = minValue;
        this.maxValue = maxValue;
    }

    isSatisfied(blockchain: BlockchainModel): boolean {
        return blockchain.marketCap >= this.minValue && blockchain.marketCap <= this.maxValue;
    }

}