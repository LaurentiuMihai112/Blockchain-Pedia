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
import {BitcoinCrawler} from "../crawler/impl/bitcoin-crawler";
import {TetherCrawler} from "../crawler/impl/tether-crawler";
import {UsdCoinCrawler} from "../crawler/impl/usd-coin-crawler";
import {BinanceCoinCrawler} from "../crawler/impl/binance-coin-crawler";
import {XrpCrawler} from "../crawler/impl/xrp-crawler";
import {DogeCoinCrawler} from "../crawler/impl/doge-coin-crawler";
import {PolygonCrawler} from "../crawler/impl/polygon-crawler";
import {LidoStakedEtherCrawler} from "../crawler/impl/lido-staked-ether-crawler";
import {OkbCrawler} from "../crawler/impl/okb-crawler";
import {DaiCrawler} from "../crawler/impl/dai-crawler";
import {UniswapCrawler} from "../crawler/impl/uniswap-crawler";
import {AvalancheCrawler} from "../crawler/impl/avalanche-crawler";
import {BnbCrawler} from "../crawler/impl/bnb-crawler";

export class BlockchainRuntimeCachedData {
    static blockchainData: BlockchainModel[] = []
    public static readonly MINUTES_DELTA_FOR_CACHING = 60;
    static lastUpdated: number | any = null

    public static async getData(): Promise<BlockchainModel[]> {
        if ((moment(this.lastUpdated).add(this.MINUTES_DELTA_FOR_CACHING, 'm').toDate() <= moment(Date.now()).toDate()) || this.lastUpdated == null || this.blockchainData.length == 0) {
            BlockchainRuntimeCachedData.blockchainData = []
            console.log("Fetching new Data from API\n")
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
                new LitecoinCrawler(coinGeckoApi),
                new BitcoinCrawler(coinGeckoApi),
                new TetherCrawler(coinGeckoApi),
                new BnbCrawler(coinGeckoApi),
                new UsdCoinCrawler(coinGeckoApi),
                new BinanceCoinCrawler(coinGeckoApi),
                new XrpCrawler(coinGeckoApi),
                new DogeCoinCrawler(coinGeckoApi),
                new PolygonCrawler(coinGeckoApi),
                new LidoStakedEtherCrawler(coinGeckoApi),
                new OkbCrawler(coinGeckoApi),
                new DaiCrawler(coinGeckoApi),
                new UniswapCrawler(coinGeckoApi),
                new AvalancheCrawler(coinGeckoApi),
            ];

            // Get data foreach blockchain
            for (let i = 0; i < webCrawlerImplementations.length; i++) {
                BlockchainRuntimeCachedData.blockchainData.push(await webCrawlerImplementations[i].crawl());
            }


        } else
            console.log("Using cached data\n")

        // Return all blockchain data
        return BlockchainRuntimeCachedData.blockchainData
    }
}