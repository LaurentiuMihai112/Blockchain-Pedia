import {BlockchainCategory} from "./enum/blockchain-category";

export class BlockchainModel {
    constructor(name: string, baseUrl: string, category: BlockchainCategory, transactionCount: number,
                powerConsumption: number, pricePerTransaction: number, marketCap: number) {
        this._name = name;
        this._baseUrl = baseUrl;
        this._category = category;
        this._transactionCount = transactionCount;
        this._powerConsumption = powerConsumption;
        this._pricePerTransaction = pricePerTransaction;
        this._marketCap = marketCap;
    }

    private _name: string;

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    private _baseUrl: string;

    get baseUrl(): string {
        return this._baseUrl;
    }

    set baseUrl(value: string) {
        this._baseUrl = value;
    }

    private _category: BlockchainCategory;

    get category(): BlockchainCategory {
        return this._category;
    }

    set category(value: BlockchainCategory) {
        this._category = value;
    }

    private _transactionCount: number;

    get transactionCount(): number {
        return this._transactionCount;
    }

    set transactionCount(value: number) {
        this._transactionCount = value;
    }

    private _powerConsumption: number; // in MWh

    get powerConsumption(): number {
        return this._powerConsumption;
    }

    set powerConsumption(value: number) {
        this._powerConsumption = value;
    }

    private _pricePerTransaction: number; // in USD

    get pricePerTransaction(): number {
        return this._pricePerTransaction;
    }

    set pricePerTransaction(value: number) {
        this._pricePerTransaction = value;
    }

    private _marketCap: number; // in USD

    get marketCap(): number {
        return this._marketCap;
    }

    set marketCap(value: number) {
        this._marketCap = value;
    }
}