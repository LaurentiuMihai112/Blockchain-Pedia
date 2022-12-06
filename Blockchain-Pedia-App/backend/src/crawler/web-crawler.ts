import {BlockchainModel} from "../model/blockchain-model";

export abstract class WebCrawler {
    public static delayTime:number=1000
    abstract crawl(): Promise<BlockchainModel>

}