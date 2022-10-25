class BlockchainModel {
    private _name: string;
    private _baseUrl: string;
    private _category: string;
    private _transactionCount: string;
    private _powerConsumption: string;
    private _pricePerTransaction: string;
    private _marketCap: string;


    constructor(name: string, baseUrl: string, category: string, transactionCount: string, powerConsumption: string, pricePerTransaction: string, marketCap: string) {
        this._name = name;
        this._baseUrl = baseUrl;
        this._category = category;
        this._transactionCount = transactionCount;
        this._powerConsumption = powerConsumption;
        this._pricePerTransaction = pricePerTransaction;
        this._marketCap = marketCap;
    }


    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    set baseUrl(value: string) {
        this._baseUrl = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get transactionCount(): string {
        return this._transactionCount;
    }

    set transactionCount(value: string) {
        this._transactionCount = value;
    }

    get powerConsumption(): string {
        return this._powerConsumption;
    }

    set powerConsumption(value: string) {
        this._powerConsumption = value;
    }

    get pricePerTransaction(): string {
        return this._pricePerTransaction;
    }

    set pricePerTransaction(value: string) {
        this._pricePerTransaction = value;
    }

    get marketCap(): string {
        return this._marketCap;
    }

    set marketCap(value: string) {
        this._marketCap = value;
    }
}