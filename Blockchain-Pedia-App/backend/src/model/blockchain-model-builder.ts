import {BlockchainModel} from "./blockchain-model";
import {BlockchainCategory} from "./enum/blockchain-category";

export class BlockchainModelBuilder {
    private _name: string = ""
    private _baseUrl: string = ""
    private _category: BlockchainCategory = BlockchainCategory.PUBLIC
    private _transactionCount: number = 0
    private _powerConsumption: number = 0
    private _pricePerTransaction: number = 0
    private _marketCap: number = 0

    public BlockchainModelBuilder() {
    }

    public withName(name: string): BlockchainModelBuilder {
        this._name = name
        return this
    }

    public withBaseUrl(baseUrl: string): BlockchainModelBuilder {
        this._baseUrl = baseUrl
        return this
    }

    public withCategory(category: BlockchainCategory): BlockchainModelBuilder {
        this._category = category
        return this
    }

    public withTransactionCount(transactionCount: number): BlockchainModelBuilder {
        this._transactionCount = transactionCount
        return this
    }

    public withPricePerTransaction(pricePerTransaction: number): BlockchainModelBuilder {
        this._pricePerTransaction = pricePerTransaction
        return this
    }

    public withMarketCap(marketCap: number): BlockchainModelBuilder {
        this._marketCap = marketCap
        return this
    }

    public withPowerConsumption(powerConsumption: number): BlockchainModelBuilder {
        this._powerConsumption = powerConsumption
        return this
    }

    public build(): BlockchainModel {
        return new BlockchainModel(
            this._name, this._baseUrl, this._category, this._transactionCount, this._powerConsumption,
            this._pricePerTransaction, this._marketCap
        )
    }
}