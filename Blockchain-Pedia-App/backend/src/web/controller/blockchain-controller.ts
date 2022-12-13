import {NextFunction, Request, Response} from "express";
import {BlockchainService} from "../service/blockchain-service";
import {BlockchainSorter} from "../../sort/blockchain-sorter";
import {MarketCapComparator} from "../../sort/impl/market-cap-comparator";
import {PowerConsumptionComparator} from "../../sort/impl/power-consumption-comparator";
import {PricePerTransactionComparator} from "../../sort/impl/price-per-transaction-comparator";
import {TransactionCountComparator} from "../../sort/impl/transaction-count-comparator";
import {BlockchainFilter} from "../../filter/blockchain-filter";
import {NumericSpec} from "../../filter/impl/numeric-spec";
import {BlockchainModel} from "../../model/blockchain-model";

export class BlockchainController {

    public static getAllBlockchains = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {sortBy, order, min, max, filterBy} = req.query;
        let blockchains: BlockchainModel[] = [];

        if (filterBy && (!min || !max)) {
            res.status(400).send("Missing specification for filter.")
            return;
        }
        try {
            blockchains = await BlockchainService.findAll();
        } catch (error) {
            console.log("Error***********\n")
            next(error)
            return;
            // res.status(500).send("Error while fetching blockchains");
        }

        // filters
        const filterKey = `${filterBy}`;

        if (filterBy && !["marketCap", "powerConsumption", "pricePerTransaction", "transactionCount"].includes(filterKey)) {
            res.status(400).send("Invalid filter key.");
            return;
        }

        if (filterBy) {
            // @ts-ignore
            const spec = new NumericSpec(Number(min), Number(max), filterKey);
            const blockchainFilter = new BlockchainFilter();
            blockchains = blockchainFilter.filter(blockchains, spec);
        }

        // sorting
        const sortKey = `${sortBy}`;
        let comparator;

        if (sortBy && !["marketCap", "powerConsumption", "pricePerTransaction", "transactionCount"].includes(sortKey)) {
            res.status(400).send("Invalid sorting key.");
            return;
        }

        if (sortBy && !(order === 'asc' || order === 'desc')) {
            res.status(400).send("Invalid order option.");
            return;
        }

        switch (sortKey) {
            case "marketCap":
                comparator = new MarketCapComparator();
                break;
            case "powerConsumption":
                comparator = new PowerConsumptionComparator();
                break;
            case "pricePerTransaction":
                comparator = new PricePerTransactionComparator();
                break;
            case "transactionCount":
                comparator = new TransactionCountComparator();
                break;
        }

        if (comparator) {
            const blockchainSorter = new BlockchainSorter();
            blockchains = order === 'asc' ? blockchainSorter.sortAscending(blockchains, comparator)
                : blockchainSorter.sortDescending(blockchains, comparator);
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(blockchains);
        return;
    }

    public static getBlockchainRecommendations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {
            type,
            maxPricePerTransaction,
            maxPowerConsumption,
            minMarketCap,
            maxMarketCap,
            minTransactionCount,
            maxTransactionCount
        } = req.query;
        // @ts-ignore
        const blockchains = await BlockchainService.findRecommendations(type, maxPricePerTransaction, maxPowerConsumption, minMarketCap, maxMarketCap, minTransactionCount, maxTransactionCount)

        if (blockchains == null) {
            res.status(400).send("Found invalid values in request body!").end()
            return;
        }

        res.status(200).send(blockchains.splice(0, 3)).end()
        return;
    }
}