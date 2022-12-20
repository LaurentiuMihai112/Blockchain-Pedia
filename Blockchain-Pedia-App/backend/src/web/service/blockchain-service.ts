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

    public static async findRecommendations(type: string,
                                            minPricePerTransaction: string,
                                            maxPricePerTransaction: string,
                                            minMarketCap: string,
                                            maxMarketCap: string,
                                            minTransactionCount: string,
                                            maxTransactionCount: string,
                                            maxPowerConsumption: string,
                                            minPowerConsumption: string): Promise<BlockchainModel[] | null> {
        let blockchainsList = await BlockchainService.findAll();
        // for (const blockchain of blockchainsList) {
        //     blockchains.push(structuredClone(blockchain))
        // }
        let blockchains  = BlockchainService.copyList(blockchainsList)


        // Filter by blockchain type
        let blockchainType = getBlockchainCategoryFromText(type)
        if (blockchainType == null) {
            return null;
        }
        // console.log("_________________RATING_________________")
        blockchains = this.rateBlockchains(blockchains, minPricePerTransaction, maxPricePerTransaction, minMarketCap, maxMarketCap, minTransactionCount, maxTransactionCount, maxPowerConsumption, minPowerConsumption)
        // Sort recommendations
        blockchains = this.sortRecommendationsByRating(blockchains)
        // for (const blockchainElement of blockchains) {
        //     console.log(blockchainElement.rating)
        //     console.log('\n')
        // }

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

    private static rateBlockchains(blockchains: BlockchainModel[],
                                   minPricePerTransaction: string,
                                   maxPricePerTransaction: string,
                                   minMarketCap: string,
                                   maxMarketCap: string,
                                   minTransactionCount: string,
                                   maxTransactionCount: string,
                                   maxPowerConsumption: string,
                                   minPowerConsumption: string) {
        for (const blockchain of blockchains) {
            if (blockchain.pricePerTransaction < parseInt(maxPricePerTransaction) && blockchain.pricePerTransaction > parseInt(minPricePerTransaction)) {
                blockchain.rating *= 1.2;
            } else {
                blockchain.rating *= 0.8
            }
            if (blockchain.marketCap < parseInt(maxMarketCap) && blockchain.marketCap > parseInt(minMarketCap)) {
                blockchain.rating *= 1.2;
            } else {
                blockchain.rating *= 0.8
            }
            if (blockchain.transactionCount < parseInt(maxTransactionCount) && blockchain.transactionCount > parseInt(minTransactionCount)) {
                blockchain.rating *= 1.2;
            } else {
                blockchain.rating *= 0.8
            }
            if (blockchain.powerConsumption < parseInt(maxPowerConsumption) && blockchain.powerConsumption > parseInt(minPowerConsumption)) {
                blockchain.rating *= 1.2;
            } else {
                blockchain.rating *= 0.8
            }
        }
        return blockchains
    }

    private static sortRecommendationsByRating(blockchains: BlockchainModel[]) {
        return blockchains.sort((b1, b2) => {
            return b2.rating - b1.rating
        });
    }

    public static copyList(blockchainList: BlockchainModel[]): BlockchainModel[] {
        let copy: BlockchainModel[] = []
        for (const blockchain of blockchainList) {
            copy.push(new BlockchainModel(
                blockchain.name,
                blockchain.baseUrl,
                blockchain.category,
                blockchain.transactionCount,
                blockchain.powerConsumption,
                blockchain.pricePerTransaction,
                blockchain.marketCap))
        }
        return copy
    }
}