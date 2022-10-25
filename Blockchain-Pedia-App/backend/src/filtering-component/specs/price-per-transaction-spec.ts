class PricePerTransactionSpec implements BlockchainSpec{
    private category:BlockchainCategory;

    constructor(category: BlockchainCategory) {
        this.category = category;
    }

    isSatisfied(): boolean {
        return false;
    }

}