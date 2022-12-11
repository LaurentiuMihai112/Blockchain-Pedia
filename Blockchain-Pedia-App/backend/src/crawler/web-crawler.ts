import {BlockchainModel} from "../model/blockchain-model";

export abstract class WebCrawler {
    public static delayTime: number = 2000

    abstract crawl(): Promise<BlockchainModel>

}