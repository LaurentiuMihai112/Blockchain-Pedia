import {BlockchainModel} from "../../model/blockchain-model";
import {EthereumCrawler} from "../../crawler/impl/ethereum-crawler";
import {CoinGeckoApi} from "../../crawler/api/coingecko-api";
import {TronCrawler} from "../../crawler/impl/tron-crawler";
import {CardanoCrawler} from "../../crawler/impl/cardano-crawler";
import {WebCrawler} from "../../crawler/web-crawler";
import {SolanaCrawler} from "../../crawler/impl/solana-crawler";
import {PolkadotCrawler} from "../../crawler/impl/polkadot-crawler";

export class BlockchainService {
    public static async findAll(): Promise<BlockchainModel[]> {
        let blockchainData = []
        const coinGeckoApi = new CoinGeckoApi();
        // Blockchain crawler implementations
        const webCrawlerImplementations: WebCrawler[] = [
            new EthereumCrawler(coinGeckoApi),
            new TronCrawler(coinGeckoApi),
            new CardanoCrawler(coinGeckoApi),
            new SolanaCrawler(coinGeckoApi),
            new PolkadotCrawler(coinGeckoApi)
        ];

        // Get data foreach blockchain
        for (let i = 0; i < webCrawlerImplementations.length; i++) {
            blockchainData.push(await webCrawlerImplementations[i].crawl());
        }
        
        // Return all blockchain data
        return blockchainData
    }

    public static sayHello(): string {
        return "Hello world!";
    }
}