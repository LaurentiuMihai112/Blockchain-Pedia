import {CoinGeckoApi} from "../api/coingecko-api";
import mocked = jest.mocked;
import {TronCrawler} from "./tron-crawler";
import {HttpJsonResponse} from "../http/http-json-response";
import {BlockchainCategory} from "../../model/enum/blockchain-category";
import {BlockchainModel} from "../../model/blockchain-model";
import {
    tronCrawlerJsonResponseFailPath, tronCrawlerJsonResponseHappyPath
} from "./__mocks__/mock-constants";

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

describe('Tron Crawler Tests', () => {
    const MockedCoinGeckoApi = mocked(CoinGeckoApi, {shallow: true})

    beforeEach(() => {
        MockedCoinGeckoApi.mockClear()
    })

    it("API response: 200, then return BlockchainModel", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(200, tronCrawlerJsonResponseHappyPath)
        }

        // When
        // @ts-ignore
        const tronCrawler = new TronCrawler(MockedCoinGeckoApi)
        let response: BlockchainModel = await tronCrawler.crawl()

        // Then
        expect(response.name).toEqual("TRON")
        expect(response.baseUrl).toEqual("https://tron.network/")
        expect(response.category).toEqual(BlockchainCategory.PUBLIC)
        expect(response.transactionCount).toEqual(92258746339.0195)
        expect(response.powerConsumption).toEqual(0.1629)
        expect(response.pricePerTransaction).toEqual(0.062974)
        expect(response.marketCap).toEqual(5809764736)
    })

    it("API response: 404, then throw exception", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(404, tronCrawlerJsonResponseFailPath)
        }

        // When & Then
        // @ts-ignore
        const tronCrawler = new TronCrawler(MockedCoinGeckoApi)
        let errorHasBeenThrown: boolean = false;
        try {
            await tronCrawler.crawl()
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
            return new HttpJsonResponse(429, tronCrawlerJsonResponseFailPath)
        }

        // When & Then
        // @ts-ignore
        const tronCrawler = new TronCrawler(MockedCoinGeckoApi)
        let errorHasBeenThrown: boolean = false;
        try {
            await tronCrawler.crawl()
            errorHasBeenThrown = false;
        } catch (Error) {
            errorHasBeenThrown = true;
        }

        expect(errorHasBeenThrown).toEqual(true)
    })
})