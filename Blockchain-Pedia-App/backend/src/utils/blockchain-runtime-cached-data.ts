import {BlockchainModel} from "../model/blockchain-model";
import {CoinGeckoApi} from "../crawler/api/coingecko-api";
import {WebCrawler} from "../crawler/web-crawler";
import {EthereumCrawler} from "../crawler/impl/ethereum-crawler";
import {TronCrawler} from "../crawler/impl/tron-crawler";
import {CardanoCrawler} from "../crawler/impl/cardano-crawler";
import {SolanaCrawler} from "../crawler/impl/solana-crawler";
import {PolkadotCrawler} from "../crawler/impl/polkadot-crawler";
import {StellarCrawler} from "../crawler/impl/stellar-crawler";
import {LitecoinCrawler} from "../crawler/impl/litecoin-crawler";
import moment from 'moment';

export class BlockchainRuntimeCachedData {
    static blockchainData: BlockchainModel[] = []
    public static readonly MINUTES_DELTA_FOR_CACHING = 60;
    static lastUpdated: number | any = null

    public static async getData(): Promise<BlockchainModel[]> {
        if ((moment(this.lastUpdated).add(this.MINUTES_DELTA_FOR_CACHING, 'm').toDate() <= moment(Date.now()).toDate()) || this.lastUpdated == null) {
            BlockchainRuntimeCachedData.blockchainData = []
            console.log("rerun API\n")
            this.lastUpdated = Date.now()

            const coinGeckoApi = new CoinGeckoApi();
            // Blockchain crawler implementations
            const webCrawlerImplementations: WebCrawler[] = [
                new EthereumCrawler(coinGeckoApi),
                new TronCrawler(coinGeckoApi),
                new CardanoCrawler(coinGeckoApi),
                new SolanaCrawler(coinGeckoApi),
                new PolkadotCrawler(coinGeckoApi),
                new StellarCrawler(coinGeckoApi),
                new LitecoinCrawler(coinGeckoApi)
            ];

            // Get data foreach blockchain
            for (let i = 0; i < webCrawlerImplementations.length; i++) {
                BlockchainRuntimeCachedData.blockchainData.push(await webCrawlerImplementations[i].crawl());
            }

        } else
            console.log("Not enough time passed\n")

        // Return all blockchain data
        return BlockchainRuntimeCachedData.blockchainData
    }
}