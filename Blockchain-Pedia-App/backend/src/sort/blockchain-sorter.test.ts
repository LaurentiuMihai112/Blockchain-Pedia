import {
    expectedResultMarketCapCompAsc,
    expectedResultMarketCapCompDesc,
    expectedResultPowerConsumptionCompAsc,
    expectedResultPowerConsumptionCompDesc,
    expectedResultPricePerTransactionCompAsc,
    expectedResultPricePerTransactionCompDesc,
    expectedResultTransactionCountCompAsc,
    expectedResultTransactionCountCompDesc,
    mockedBlockchainArr
} from "./__mocks__/mocked-constants";
import {MarketCapComparator} from "./impl/market-cap-comparator";
import {BlockchainSorter} from "./blockchain-sorter";
import {PowerConsumptionComparator} from "./impl/power-consumption-comparator";
import {BlockchainModel} from "../model/blockchain-model";
import {PricePerTransactionComparator} from "./impl/price-per-transaction-comparator";
import {TransactionCountComparator} from "./impl/transaction-count-comparator";

describe('Blockchain Sorter Tests', () => {
    it("Market Cap Comparator Ascending Test", () => {
        // Given
        let comparator = new MarketCapComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse = expectedResultMarketCapCompAsc

        // When
        let actualResponse = sorter.sortAscending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Market Cap Comparator Descending Test", () => {
        // Given
        let comparator = new MarketCapComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse = expectedResultMarketCapCompDesc

        // When
        let actualResponse = sorter.sortDescending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Power Consumption Comparator Ascending Test", () => {
        // Given
        let comparator = new PowerConsumptionComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse: BlockchainModel[] = expectedResultPowerConsumptionCompAsc

        // When
        let actualResponse = sorter.sortAscending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Power Consumption Comparator Descending Test", () => {
        // Given
        let comparator = new PowerConsumptionComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse: BlockchainModel[] = expectedResultPowerConsumptionCompDesc

        // When
        let actualResponse = sorter.sortDescending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Price Per Transaction Comparator Ascending Test", () => {
        // Given
        let comparator = new PricePerTransactionComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse: BlockchainModel[] = expectedResultPricePerTransactionCompAsc

        // When
        let actualResponse = sorter.sortAscending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Price Per Transaction Comparator Descending Test", () => {
        // Given
        let comparator = new PricePerTransactionComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse: BlockchainModel[] = expectedResultPricePerTransactionCompDesc

        // When
        let actualResponse = sorter.sortDescending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Transaction Count Comparator Ascending Test", () => {
        // Given
        let comparator = new TransactionCountComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse: BlockchainModel[] = expectedResultTransactionCountCompAsc

        // When
        let actualResponse = sorter.sortAscending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })

    it("Transaction Count Comparator Descending Test", () => {
        // Given
        let comparator = new TransactionCountComparator()
        let sorter = new BlockchainSorter()

        let blockchainModelArr = mockedBlockchainArr
        let expectedResponse: BlockchainModel[] = expectedResultTransactionCountCompDesc

        // When
        let actualResponse = sorter.sortDescending(blockchainModelArr, comparator)

        // Then
        expect(actualResponse).toEqual(expectedResponse)
    })
})