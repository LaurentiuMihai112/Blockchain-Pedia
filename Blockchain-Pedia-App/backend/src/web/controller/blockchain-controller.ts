import {NextFunction, Request, Response} from "express";
import {BlockchainService} from "../service/blockchain-service";
import {BlockchainSorter} from "../../sort/blockchain-sorter";
import {MarketCapComparator} from "../../sort/impl/market-cap-comparator";
import {PowerConsumptionComparator} from "../../sort/impl/power-consumption-comparator";
import {PricePerTransactionComparator} from "../../sort/impl/price-per-transaction-comparator";
import {TransactionCountComparator} from "../../sort/impl/transaction-count-comparator";
import {BlockchainFilter} from "../../filter/blockchain-filter";
import {NumericSpec} from "../../filter/impl/numeric-spec";

export class BlockchainController {

    public static getAllBlockchains = async (req: Request, res: Response): Promise<void> => {
        const {sortBy, order, min, max, filterBy} = req.query;
        let blockchains;

        if (filterBy && (!min || !max)) {
            res.status(400).send("Missing specification for filter.")
            return;
        }

        try {
            blockchains = await BlockchainService.findAll();
        } catch (error) {
            res.status(500).send("Error while fetching blockchains");
            return;
        }

        // filters
        const filterKey = `${filterBy}`;

        if(filterBy && !["marketCap", "powerConsumption", "pricePerTransaction", "transactionCount"].includes(filterKey)){
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

        if(sortBy && !["marketCap", "powerConsumption", "pricePerTransaction", "transactionCount"].includes(sortKey)){
            res.status(400).send("Invalid sorting key.");
            return;
        }

        if(sortBy && !(order === 'asc' || order === 'desc')) {
            res.status(400).send("Invalid order option.");
            return;
        }

        switch(sortKey) {
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
}