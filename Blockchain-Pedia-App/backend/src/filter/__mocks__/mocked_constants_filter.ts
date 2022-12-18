import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelBuilder} from "../../model/blockchain-model-builder";
import {BlockchainCategory} from "../../model/enum/blockchain-category";

export const mockedBlockchainArray = getMockedBlockchainArray()

export const expectedResultMarketCap = getExpectedResultMarketCap()
export const expectedResultCategory = getExpectedResultCategory()

export const expectedResultPricePerTransaction = getExpectedResultPricePerTransaction()

export const expectedResultTransaction = getExpectedResultTransaction()

let blockchainModel1 = new BlockchainModelBuilder()
    .withName("Mocked1")
    .withCategory(BlockchainCategory.PUBLIC)
    .withMarketCap(200)
    .withTransactionCount(5000)
    .withPowerConsumption(100)
    .withPricePerTransaction(1.5)
    .withBaseUrl("http://mocked1").build();

let blockchainModel2 = new BlockchainModelBuilder()
    .withName("Mocked2")
    .withCategory(BlockchainCategory.PRIVATE)
    .withMarketCap(700)
    .withTransactionCount(100)
    .withPowerConsumption(20)
    .withPricePerTransaction(0.1)
    .withBaseUrl("http://mocked2").build();

let blockchainModel3 = new BlockchainModelBuilder()
    .withName("Mocked3")
    .withCategory(BlockchainCategory.HYBRID)
    .withMarketCap(80000)
    .withTransactionCount(20000)
    .withPowerConsumption(1)
    .withPricePerTransaction(10.3)
    .withBaseUrl("http://mocked3").build();

let blockchainModel4 = new BlockchainModelBuilder()
    .withName("Mocked4")
    .withCategory(BlockchainCategory.PUBLIC)
    .withMarketCap(1)
    .withTransactionCount(2304)
    .withPowerConsumption(1.5)
    .withPricePerTransaction(874)
    .withBaseUrl("http://mocked4").build();

let blockchainModel5 = new BlockchainModelBuilder()
    .withName("Mocked5")
    .withCategory(BlockchainCategory.HYBRID)
    .withMarketCap(100)
    .withTransactionCount(300)
    .withPowerConsumption(15)
    .withPricePerTransaction(0.3)
    .withBaseUrl("http://mocked5").build();

function getMockedBlockchainArray(): BlockchainModel[] {
    return [blockchainModel1, blockchainModel2, blockchainModel3, blockchainModel4, blockchainModel5]
}

function getExpectedResultMarketCap(): BlockchainModel[] {
    return [blockchainModel1, blockchainModel2, blockchainModel4, blockchainModel5]
}

function getExpectedResultCategory(): BlockchainModel[] {
    return [blockchainModel3, blockchainModel5]
}

function getExpectedResultPricePerTransaction(): BlockchainModel[] {
    return [blockchainModel1, blockchainModel2, blockchainModel3, blockchainModel4, blockchainModel5]
}

function getExpectedResultTransaction(): BlockchainModel[] {
    return [blockchainModel1, blockchainModel2, blockchainModel3, blockchainModel4, blockchainModel5]
}