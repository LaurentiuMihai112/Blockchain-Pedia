import {CoinGeckoApi} from "../api/coingecko-api";
import mocked = jest.mocked;
import {EthereumCrawler} from "./ethereum-crawler";
import {HttpJsonResponse} from "../http/http-json-response";
import {BlockchainCategory} from "../../model/enum/blockchain-category";
import {BlockchainModel} from "../../model/blockchain-model";
import {
    ethereumCrawlerJsonResponseFailPath,
    ethereumCrawlerJsonResponseHappyPath
} from "./__mocks__/mock-constants.test";

jest.mock('../api/coingecko-api.ts', () => {
    return {
        CoinGeckoApi: jest.fn().mockImplementation(() => {
            return {
                getCoinCurrentData: (coinId: string) => {
                }
            }
        })
    }
})

describe('Ethereum Crawler Tests', () => {
    const MockedCoinGeckoApi = mocked(CoinGeckoApi, {shallow: true})

    beforeEach(() => {
        MockedCoinGeckoApi.mockClear()
    })

    it("API response: 200, then return BlockchainModel", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(200, ethereumCrawlerJsonResponseHappyPath)
        }

        // When
        // @ts-ignore
        const ethereumCrawler = new EthereumCrawler(MockedCoinGeckoApi)
        let response: BlockchainModel = await ethereumCrawler.crawl()

        // Then
        expect(response.name).toEqual("Ethereum")
        expect(response.baseUrl).toEqual("https://ethereum.org/")
        expect(response.category).toEqual(BlockchainCategory.PUBLIC)
        expect(response.transactionCount).toEqual(120522143.702509)
        expect(response.powerConsumption).toEqual(2601)
        expect(response.pricePerTransaction).toEqual(1587.9)
        expect(response.marketCap).toEqual(191474094858)
    })

    it("API response: 404, then throw exception", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(404, ethereumCrawlerJsonResponseFailPath)
        }

        // When & Then
        // @ts-ignore
        const ethereumCrawler = new EthereumCrawler(MockedCoinGeckoApi)
        let errorHasBeenThrown: boolean = false;
        try {
            await ethereumCrawler.crawl()
            errorHasBeenThrown = false;
        } catch (error) {
            errorHasBeenThrown = true;
        }

        expect(errorHasBeenThrown).toEqual(true)
    })

    it("API response: 429, then throw exception", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(429, ethereumCrawlerJsonResponseFailPath)
        }

        // When & Then
        // @ts-ignore
        const ethereumCrawler = new EthereumCrawler(MockedCoinGeckoApi)
        let errorHasBeenThrown: boolean = false;
        try {
            await ethereumCrawler.crawl()
            errorHasBeenThrown = false;
        } catch (Error) {
            errorHasBeenThrown = true;
        }

        expect(errorHasBeenThrown).toEqual(true)
    })
})