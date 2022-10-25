import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelBuilder} from "../../model/blockchain-model-builder";

class TronCrawler implements WebCrawler {
    crawl(): BlockchainModel {
        return new BlockchainModelBuilder().build()
    }

}