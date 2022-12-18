import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelBuilder} from "../../model/blockchain-model-builder";
import {BlockchainCategory} from "../../model/enum/blockchain-category";

export const mockedBlockchainArr = getMockedBlockchainArr()

export const expectedResultMarketCapCompAsc = getExpectedResultMarketCapCompAsc()
export const expectedResultMarketCapCompDesc = getExpectedResultMarketCapCompAsc().reverse()

export const expectedResultPowerConsumptionCompAsc = getExpectedResultPowerConsumptionCompAsc()
export const expectedResultPowerConsumptionCompDesc = getExpectedResultPowerConsumptionCompAsc().reverse()

export const expectedResultPricePerTransactionCompAsc = getExpectedResultPricePerTransactionCompAsc()
export const expectedResultPricePerTransactionCompDesc = getExpectedResultPricePerTransactionCompAsc().reverse()

export const expectedResultTransactionCountCompAsc = getExpectedResultTransactionCountCompAsc()
export const expectedResultTransactionCountCompDesc = getExpectedResultTransactionCountCompAsc().reverse()
let blockchainModel1 = new BlockchainModelBuilder()
    .withName("Mocked1")
    .withCategory(BlockchainCategory.PUBLIC)
    .withMarketCap(100)
    .withTransactionCount(500)
    .withPowerConsumption(10)
    .withPricePerTransaction(0.5)
    .withBaseUrl("http://mocked1").build();

let blockchainModel2 = new BlockchainModelBuilder()
    .withName("Mocked2")
    .withCategory(BlockchainCategory.PRIVATE)
    .withMarketCap(300)
    .withTransactionCount(600)
    .withPowerConsumption(5)
    .withPricePerTransaction(0.7)
    .withBaseUrl("http://mocked2").build();

let blockchainModel3 = new BlockchainModelBuilder()
    .withName("Mocked3")
    .withCategory(BlockchainCategory.HYBRID)
    .withMarketCap(200)
    .withTransactionCount(400)
    .withPowerConsumption(4)
    .withPricePerTransaction(0.8)
    .withBaseUrl("http://mocked3").build();

let blockchainModel4 = new BlockchainModelBuilder()
    .withName("Mocked4")
    .withCategory(BlockchainCategory.PUBLIC)
    .withMarketCap(50)
    .withTransactionCount(100)
    .withPowerConsumption(2)
    .withPricePerTransaction(0.9)
    .withBaseUrl("http://mocked4").build();

let blockchainModel5 = new BlockchainModelBuilder()
    .withName("Mocked5")
    .withCategory(BlockchainCategory.HYBRID)
    .withMarketCap(100)
    .withTransactionCount(300)
    .withPowerConsumption(15)
    .withPricePerTransaction(0.3)
    .withBaseUrl("http://mocked5").build();

function getMockedBlockchainArr(): BlockchainModel[] {
    return [blockchainModel1, blockchainModel2, blockchainModel3, blockchainModel4, blockchainModel5]
}

function getExpectedResultMarketCapCompAsc(): BlockchainModel[] {
    return [blockchainModel4, blockchainModel1, blockchainModel5, blockchainModel3, blockchainModel2]
}

function getExpectedResultPowerConsumptionCompAsc(): BlockchainModel[] {
    return [blockchainModel4, blockchainModel3, blockchainModel2, blockchainModel1, blockchainModel5]
}

function getExpectedResultPricePerTransactionCompAsc(): BlockchainModel[] {
    return [blockchainModel5, blockchainModel1, blockchainModel2, blockchainModel3, blockchainModel4]
}

function getExpectedResultTransactionCountCompAsc(): BlockchainModel[] {
    return [blockchainModel4, blockchainModel5, blockchainModel3, blockchainModel1, blockchainModel2]
}