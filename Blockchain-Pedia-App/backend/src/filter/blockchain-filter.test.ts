import {
    expectedResultCategory,
    expectedResultMarketCap,
    expectedResultPricePerTransaction,
    expectedResultTransaction,
    mockedBlockchainArray
} from "./__mocks__/mocked_constants_filter";
import {MarketCapSpec} from "./impl/market-cap-spec";
import {CategorySpec} from "./impl/category-spec";
import {BlockchainModel} from "../model/blockchain-model";
import {TransactionSpec} from "./impl/transaction-spec";
import {BlockchainCategory} from "../model/enum/blockchain-category";
import {PricePerTransactionSpec} from "./impl/price-per-transaction-spec";
import {BlockchainFilter} from "./blockchain-filter";


describe('Blockchain Filter Tests', () => {
    it("Market Cap Test",  () => {
        // Given
        let blockchainSpec = new MarketCapSpec(0,2000)
        let spec = new BlockchainFilter()

        let blockchainModelArr = mockedBlockchainArray
        let expectedResponse = expectedResultMarketCap

        // When
        let actualResponse = spec.filter(blockchainModelArr, blockchainSpec)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Category Test",  () => {
        // Given
        let blockchainSpec = new CategorySpec(BlockchainCategory.HYBRID)
        let spec = new BlockchainFilter()

        let blockchainModelArr = mockedBlockchainArray
        let expectedResponse: BlockchainModel[] = expectedResultCategory

        // When
        let actualResponse = spec.filter(blockchainModelArr, blockchainSpec)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })


    it("Price Per Transaction Test",  () => {
        // Given
        let blockchainSpec = new PricePerTransactionSpec(0,20000000000)
        let spec = new BlockchainFilter()

        let blockchainModelArr = mockedBlockchainArray
        let expectedResponse: BlockchainModel[] = expectedResultPricePerTransaction

        // When
        let actualResponse = spec.filter(blockchainModelArr, blockchainSpec)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })


    it("Transaction Count Test",  () => {
        // Given
        let blockchainSpec = new TransactionSpec(0,1000000000)
        let spec = new BlockchainFilter()

        let blockchainModelArr = mockedBlockchainArray
        let expectedResponse: BlockchainModel[] = expectedResultTransaction

        // When
        let actualResponse = spec.filter(blockchainModelArr, blockchainSpec)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

})