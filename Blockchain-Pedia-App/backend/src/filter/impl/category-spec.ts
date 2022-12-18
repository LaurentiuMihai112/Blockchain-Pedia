import {BlockchainCategory} from "../../model/enum/blockchain-category";
import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainSpec} from "../blockchain-spec";

export class CategorySpec implements BlockchainSpec {
    private readonly category: BlockchainCategory;


    constructor(category: BlockchainCategory) {
        this.category = category;
    }

    isSatisfied(blockchain: BlockchainModel): boolean {
        return blockchain.category == this.category;
    }


}