import {BlockchainCategory} from "../../model/enum/blockchain-category";

class TransactionSpec implements BlockchainSpec {
    private category: BlockchainCategory;

    constructor(category: BlockchainCategory) {
        this.category = category;
    }

    isSatisfied(): boolean {
        return false;
    }

}