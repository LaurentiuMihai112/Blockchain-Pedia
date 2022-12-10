import {CoinGeckoApi} from "../api/coingecko-api";
import mocked = jest.mocked;
import {CardanoCrawler} from "./cardano-crawler";
import {HttpJsonResponse} from "../http/http-json-response";
import {BlockchainCategory} from "../../model/enum/blockchain-category";
import {BlockchainModel} from "../../model/blockchain-model";
import {cardanoCrawlerJsonResponseFailPath, cardanoCrawlerJsonResponseHappyPath} from "./__mocks__/mock-constants";

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

describe('Cardano Crawler Tests', () => {
    const MockedCoinGeckoApi = mocked(CoinGeckoApi, {shallow: true})

    beforeEach(() => {
        MockedCoinGeckoApi.mockClear()
    })

    it("When API returns 200, then return BlockchainModel", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(200, cardanoCrawlerJsonResponseHappyPath)
        }

        // When
        // @ts-ignore
        const cardanoCrawler = new CardanoCrawler(MockedCoinGeckoApi)
        let response: BlockchainModel = await cardanoCrawler.crawl()

        // Then
        expect(response.name).toEqual("Cardano")
        expect(response.baseUrl).toEqual("https://cardano.org/")
        expect(response.category).toEqual(BlockchainCategory.PUBLIC)
        expect(response.transactionCount).toEqual(35045020830.3234)
        expect(response.powerConsumption).toEqual(0.018)
        expect(response.pricePerTransaction).toEqual(0.412092)
        expect(response.marketCap).toEqual(14418981692)
    })

    it("When API returns 404 Not Found, then throw exception", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(404, cardanoCrawlerJsonResponseFailPath)
        }

        // When & Then
        // @ts-ignore
        const cardanoCrawler = new CardanoCrawler(MockedCoinGeckoApi)
        let errorHasBeenThrown: boolean = false;
        try {
            await cardanoCrawler.crawl()
            errorHasBeenThrown = false;
        } catch (error) {
            errorHasBeenThrown = true;
        }

        expect(errorHasBeenThrown).toEqual(true)
    })

    it("When API returns 429 Too Many Requests, then throw exception", async () => {
        // Given
        // @ts-ignore
        MockedCoinGeckoApi.getCoinCurrentData = (coinId: string) => {
            return new HttpJsonResponse(429, cardanoCrawlerJsonResponseFailPath)
        }

        // When & Then
        // @ts-ignore
        const cardanoCrawler = new CardanoCrawler(MockedCoinGeckoApi)
        let errorHasBeenThrown: boolean = false;
        try {
            await cardanoCrawler.crawl()
            errorHasBeenThrown = false;
        } catch (Error) {
            errorHasBeenThrown = true;
        }

        expect(errorHasBeenThrown).toEqual(true)
    })
})