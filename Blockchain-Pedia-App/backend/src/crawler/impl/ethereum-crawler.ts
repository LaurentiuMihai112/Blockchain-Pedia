import {BlockchainModel} from "../../model/blockchain-model";
import {BlockchainModelBuilder} from "../../model/blockchain-model-builder";
import {WebCrawler} from "../web-crawler";

export class EthereumCrawler implements WebCrawler {
    async crawl(): Promise<BlockchainModel> {
        return new BlockchainModelBuilder().build()
    }

}