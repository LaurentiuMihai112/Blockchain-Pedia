import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainRuntimeCachedData} from "../../utils/blockchain-runtime-cached-data"
import {BlockchainCategory, getBlockchainCategoryFromText} from "../../model/enum/blockchain-category";
import {BlockchainFilter} from "../../filter/blockchain-filter";
import {CategorySpec} from "../../filter/impl/category-spec";
import {PricePerTransactionSpec} from "../../filter/impl/price-per-transaction-spec";
import {PowerConsumptionSpec} from "../../filter/impl/power-consumption-comparator";
import {MarketCapSpec} from "../../filter/impl/market-cap-spec";
import {TransactionCountSpec} from "../../filter/impl/transaction-count-spec";
import {BlockchainSorter} from "../../sort/blockchain-sorter";
import {
    PricePerTransactionAndMarketCapComparator
} from "../../sort/impl/price-per-transaction-and-market-cap-comparator";

function isNumericValue(value: string): boolean {
    return !isNaN(Number(value))
}

export class BlockchainService {
    public static async findAll(): Promise<BlockchainModel[]> {
        return await BlockchainRuntimeCachedData.getData()
    }

    public static async findRecommendations(type: string, maxPricePerTransaction: string, maxPowerConsumption: string,
                                            minMarketCap: string, maxMarketCap: string, minTransactionCount: string,
                                            maxTransactionCount: string): Promise<BlockchainModel[] | null> {
        let blockchains = await BlockchainService.findAll();

        // Filter by blockchain type
        let blockchainType = getBlockchainCategoryFromText(type)
        if (blockchainType == null) {
            return null;
        }
        blockchains = await this.filterBlockchainListByType(blockchains, blockchainType)

        // Filter by price per transaction
        blockchains = await this.filterBlockchainListByPricePerTransaction(blockchains, 0, maxPricePerTransaction)

        // Filter by power consumption
        blockchains = await this.filterBlockchainListByPowerConsumption(blockchains, 0, maxPowerConsumption)

        // Filter by market cap
        blockchains = await this.filterBlockchainListByMarketCap(blockchains, minMarketCap, maxMarketCap)

        // Filter by transaction count
        blockchains = await this.filterBlockchainListByTransactionCount(blockchains, minMarketCap, maxMarketCap)

        // Sort recommendations
        blockchains = this.sortRecommendations(blockchains)

        return blockchains
    }

    private static async filterBlockchainListByType(blockchains: BlockchainModel[], type: BlockchainCategory): Promise<BlockchainModel[]> {
        let blockchainFilter = new BlockchainFilter()
        blockchains = blockchainFilter.filter(blockchains, new CategorySpec(type))

        return blockchains
    }

    private static async filterBlockchainListByPricePerTransaction(blockchains: BlockchainModel[], min: number, max: string): Promise<BlockchainModel[]> {
        let maxNumber = 99999999999999
        if (isNumericValue(max)) {
            maxNumber = parseInt(max);
        }

        let blockchainFilter = new BlockchainFilter()
        blockchains = blockchainFilter.filter(blockchains, new PricePerTransactionSpec(min, maxNumber))

        return blockchains
    }

    private static async filterBlockchainListByPowerConsumption(blockchains: BlockchainModel[], min: number, max: string): Promise<BlockchainModel[]> {
        let maxNumber = 99999999999999
        if (isNumericValue(max)) {
            maxNumber = parseInt(max);
        }

        let blockchainFilter = new BlockchainFilter()
        blockchains = blockchainFilter.filter(blockchains, new PowerConsumptionSpec(min, maxNumber))

        return blockchains
    }

    private static async filterBlockchainListByMarketCap(blockchains: BlockchainModel[], min: string, max: string): Promise<BlockchainModel[]> {
        let minNumber = 0
        if (isNumericValue(min)) {
            minNumber = parseInt(min);
        }

        let maxNumber = 99999999999999
        if (isNumericValue(max)) {
            maxNumber = parseInt(max);
        }

        let blockchainFilter = new BlockchainFilter()
        blockchains = blockchainFilter.filter(blockchains, new MarketCapSpec(minNumber, maxNumber))

        return blockchains
    }

    private static async filterBlockchainListByTransactionCount(blockchains: BlockchainModel[], min: string, max: string): Promise<BlockchainModel[]> {
        let minNumber = 0
        if (isNumericValue(min)) {
            minNumber = parseInt(min);
        }

        let maxNumber = 99999999999999
        if (isNumericValue(max)) {
            maxNumber = parseInt(max);
        }

        let blockchainFilter = new BlockchainFilter()
        blockchains = blockchainFilter.filter(blockchains, new TransactionCountSpec(minNumber, maxNumber))

        return blockchains
    }

    private static sortRecommendations(blockchains: BlockchainModel[]) {
        let blockchainSorter = new BlockchainSorter()
        return blockchainSorter.sortAscending(blockchains, new PricePerTransactionAndMarketCapComparator())
    }
}