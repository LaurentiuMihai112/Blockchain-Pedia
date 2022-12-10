import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelBuilder} from "../../model/blockchain-model-builder";
import {WebCrawler} from "../web-crawler";
import {BlockchainCategory} from "../../model/enum/blockchain-category";
import {CoinGeckoApi} from "../api/coingecko-api";
import {HttpJsonResponse} from "../http/http-json-response";
import {CustomError} from "../../web/middleware/error-handler-middleware";

export class BitcoinCrawler extends WebCrawler {
    private static readonly COINGECKO_COIN_ID = "bitcoin"

    private static readonly BLOCKCHAIN_NAME: string = "Bitcoin"
    private static readonly BLOCKCHAIN_URL: string = "https://bitcoin.org/"
    private static readonly BLOCKCHAIN_CATEGORY: BlockchainCategory = BlockchainCategory.PUBLIC
    private static readonly BLOCKCHAIN_POWER_CONSUMPTION: number = 2.188 // in MWh

    private coinGeckoApi: CoinGeckoApi

    constructor(coinGeckoApi: CoinGeckoApi) {
        super()
        this.coinGeckoApi = coinGeckoApi
    }

    async crawl(): Promise<BlockchainModel> {
        // Perform HTTP request
        let httpResponse: HttpJsonResponse = await Promise.race([this.coinGeckoApi.getCoinCurrentData(BitcoinCrawler.COINGECKO_COIN_ID), this.coinGeckoApi.timeout(WebCrawler.delayTime)])
        if (httpResponse.statusCode != 200) {
            throw new CustomError(`${httpResponse.bodyAsJson}`, httpResponse.statusCode)
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
            .withName(BitcoinCrawler.BLOCKCHAIN_NAME)
            .withBaseUrl(BitcoinCrawler.BLOCKCHAIN_URL)
            .withCategory(BitcoinCrawler.BLOCKCHAIN_CATEGORY)
            .withPowerConsumption(BitcoinCrawler.BLOCKCHAIN_POWER_CONSUMPTION)
            .withTransactionCount(transactionCount)
            .withPricePerTransaction(pricePerTransaction)
            .withMarketCap(marketCap)
            .build()
    }
}