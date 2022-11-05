import {BlockchainModel} from "../../model/blockchain-model";
import {EthereumCrawler} from "../../crawler/impl/ethereum-crawler";
import {CoinGeckoApi} from "../../crawler/api/coingecko-api";
import {TronCrawler} from "../../crawler/impl/tron-crawler";
import {CardanoCrawler} from "../../crawler/impl/cardano-crawler";

export class BlockchainService {
    public static async findAll(): Promise<BlockchainModel[]> {
        const coinGeckoApi = new CoinGeckoApi();
        const ethereumCrawler = new EthereumCrawler(coinGeckoApi);
        const tronCrawler = new TronCrawler(coinGeckoApi);
        const cardanoCrawler = new CardanoCrawler(coinGeckoApi);

        const eth: BlockchainModel = await ethereumCrawler.crawl();
        const trn: BlockchainModel = await tronCrawler.crawl();
        const crd: BlockchainModel = await cardanoCrawler.crawl();

        return [eth, trn, crd]
    }

    public static sayHello(): string {
        return "Hello world!";
    }
}