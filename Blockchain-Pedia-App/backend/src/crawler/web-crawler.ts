import {BlockchainModel} from "../model/blockchain-model";

export interface WebCrawler {
    crawl(): Promise<BlockchainModel>
}