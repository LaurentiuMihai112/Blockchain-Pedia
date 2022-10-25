class TronCrawler implements WebCrawler {
    crawl(): BlockchainModel {
        return new BlockchainModel();
    }

}