class EthereumCrawler implements WebCrawler {
    crawl(): BlockchainModel {
        return new BlockchainModel();
    }

}