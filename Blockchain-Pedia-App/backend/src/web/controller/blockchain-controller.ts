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
import {CategorySpec} from "../../filter/impl/category-spec";
import {BlockchainCategory} from "../../model/enum/blockchain-category";

export class BlockchainController {

    public static getAllBlockchains = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {sortBy, order, min, max, filterBy} = req.query;
        let blockchains;

        if (filterBy && (!min || !max)) {
            res.status(400).send("Missing specification for filter.")
            return;
        }
        try {
            let blockchainsList = await BlockchainService.findAll();
            // for (const blockchain of blockchainsList) {
            //     blockchains.push(structuredClone(blockchain))
            // }
            blockchains = BlockchainService.copyList(blockchainsList)
            console.log("______________VALUES_____________\n")
            console.log(blockchainsList[1])
            console.log(blockchains[1])
            for (let i = 0; i < blockchains.length; i++) {
                console.log(blockchains[i].name + '\n')
            }
        } catch (error) {
            console.log("Error***********\n")
            console.dir(error)
            res.status(500).send("Error while fetching blockchains");
            return;
        }

        console.log(req.query, blockchains);

        // filters
        const filterKeys = `${filterBy}`
        const filters = filterBy ? filterKeys.split(',') : [];

        if (filters.length) {
            const minKey = `${min}`;
            const minValues = min ? minKey.split(',') : [];
            const maxKey = `${max}`
            const maxValues = max ? maxKey.split(',') : [];

            if (!(filters.length === minValues.length && filters.length === maxValues.length)) {
                res.status(400).send("Inconsistent filters");
                return;
            }

            for (let i = 0; i < filters.length; i++) {
                let filter = filters[i];

                if (!["marketCap", "powerConsumption", "pricePerTransaction", "transactionCount", "category"].includes(filter)) {
                    res.status(400).send("Invalid filter key.");
                    return;
                }
                if (["category"].includes(filter)) {
                    const blockchainFilter = new BlockchainFilter();
                    let category = BlockchainCategory.PUBLIC
                    if (Number(minValues[i]) == -1) category = BlockchainCategory.HYBRID
                    else if (Number(minValues[i]) == -2) category = BlockchainCategory.PRIVATE

                    blockchains = blockchainFilter.filter(blockchains, new CategorySpec(category));
                } else {
                    const spec = new NumericSpec(Number(minValues[i]), Number(maxValues[i]), <keyof BlockchainModel>filter);
                    const blockchainFilter = new BlockchainFilter();
                    blockchains = blockchainFilter.filter(blockchains, spec);
                }
            }
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
            minPricePerTransaction,
            maxTransactionCount,
            minTransactionCount,
            maxMarketCap,
            minMarketCap,
            maxPowerConsumption,
            minPowerConsumption,
        } = req.query;
        const blockchains = await BlockchainService.findRecommendations(
            // @ts-ignore
            type,
            minPricePerTransaction,
            maxPricePerTransaction,
            minMarketCap,
            maxMarketCap,
            minTransactionCount,
            maxTransactionCount,
            maxPowerConsumption,
            minPowerConsumption
        )

        if (blockchains == null) {
            res.status(400).send("Found invalid values in request body!").end()
            return;
        }

        res.status(200).send(blockchains.splice(0, 3)).end()
        return;
    }
}