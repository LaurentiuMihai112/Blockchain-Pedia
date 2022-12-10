import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelComparator} from "../blockchain-model-comparator";

export class PricePerTransactionAndMarketCapComparator implements BlockchainModelComparator {
    compare(blockchainOne: BlockchainModel, blockchainTwo: BlockchainModel): number {
        let pricePerTransactionOne = blockchainOne.pricePerTransaction;
        let pricePerTransactionTwo = blockchainTwo.pricePerTransaction;
        let marketCapOne = blockchainOne.marketCap;
        let marketCapTwo = blockchainTwo.marketCap;

        if (pricePerTransactionOne > pricePerTransactionTwo && marketCapOne < marketCapTwo) {
            return 1;
        }

        if (pricePerTransactionOne < pricePerTransactionTwo && marketCapOne > marketCapTwo) {
            return -1;
        }

        if (pricePerTransactionOne == pricePerTransactionTwo) {
            if (marketCapOne < marketCapTwo) {
                return 1;
            }

            return -1;
        }

        if (marketCapOne == marketCapTwo) {
            if (pricePerTransactionOne > pricePerTransactionTwo) {
                return 1;
            }

            return -1;
        }

        return 0;
    }
}