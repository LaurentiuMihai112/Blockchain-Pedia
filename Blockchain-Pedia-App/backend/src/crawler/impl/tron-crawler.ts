import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelBuilder} from "../../model/blockchain-model-builder";
import {WebCrawler} from "../web-crawler";
import {BlockchainCategory} from "../../model/enum/blockchain-category";
import {CoinGeckoApi} from "../api/coingecko-api";
import {HttpJsonResponse} from "../http/http-json-response";

export class TronCrawler implements WebCrawler {
    private static readonly COINGECKO_COIN_ID = "tron"

    private static readonly BLOCKCHAIN_NAME: string = "TRON"
    private static readonly BLOCKCHAIN_URL: string = "https://tron.network/"
    private static readonly BLOCKCHAIN_CATEGORY: BlockchainCategory = BlockchainCategory.PUBLIC
    private static readonly BLOCKCHAIN_POWER_CONSUMPTION: number = 0.1629 // in MWh

    private coinGeckoApi: CoinGeckoApi

    constructor(coinGeckoApi: CoinGeckoApi) {
        this.coinGeckoApi = coinGeckoApi
    }

    async crawl(): Promise<BlockchainModel> {
        // Perform HTTP request
        let httpResponse: HttpJsonResponse = await this.coinGeckoApi.getCoinCurrentData(TronCrawler.COINGECKO_COIN_ID)
        if (httpResponse.statusCode != 200) {
            throw new Error(`Received status code ${httpResponse.statusCode}`)
        }

        // Get data
        let body: object = httpResponse.bodyAsJson

        // @ts-ignore
        let transactionCount = body["market_data"]["circulating_supply"]

        // @ts-ignore
        let pricePerTransaction = body["market_data"]["current_price"]["usd"]

        // @ts-ignore
        let marketCap = body["market_data"]["market_cap"]["usd"]

        // Build & return model
        return new BlockchainModelBuilder()
            .withName(TronCrawler.BLOCKCHAIN_NAME)
            .withBaseUrl(TronCrawler.BLOCKCHAIN_URL)
            .withCategory(TronCrawler.BLOCKCHAIN_CATEGORY)
            .withPowerConsumption(TronCrawler.BLOCKCHAIN_POWER_CONSUMPTION)
            .withTransactionCount(transactionCount)
            .withPricePerTransaction(pricePerTransaction)
            .withMarketCap(marketCap)
            .build()
    }

}