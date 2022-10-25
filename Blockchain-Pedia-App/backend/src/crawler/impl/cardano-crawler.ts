import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelBuilder} from "../../model/blockchain-model-builder";

class CardanoCrawler implements WebCrawler {
    crawl(): BlockchainModel {
        return new BlockchainModelBuilder().build()
    }
}