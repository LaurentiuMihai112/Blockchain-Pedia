import {NextFunction, Request, Response} from "express";
import {BlockchainService} from "../service/blockchain-service";
import {BlockchainSorter} from "../../sort/blockchain-sorter";
import {MarketCapComparator} from "../../sort/impl/market-cap-comparator";
import {PowerConsumptionComparator} from "../../sort/impl/power-consumption-comparator";
import {PricePerTransactionComparator} from "../../sort/impl/price-per-transaction-comparator";
import {TransactionCountComparator} from "../../sort/impl/transaction-count-comparator";

export class BlockchainController {
    public static hello = (req: Request, res: Response, next: NextFunction): void => {
        let message = BlockchainService.sayHello();

        res.setHeader('Content-Type', 'text/plain');
        res.send(message);
    };

    public static getAllEntities = (req: Request, res: Response, next: NextFunction): object => {
        return BlockchainService.findAll();
    }
    
    //TO REFACTOR - urat momentan
    public static getAllBlockchains = async (req: Request, res: Response): Promise<void> => {
        try {
            const blockchains = await BlockchainService.findAll()
            let sorter = new BlockchainSorter();
            const sort = req.query.sort;
            const orderBy = req.query.orderBy;
            let comparator

            switch (sort) {
                case 'market-cap':
                    comparator = new MarketCapComparator();
                    break;
                case 'power-consumption':
                    comparator = new PowerConsumptionComparator();
                    break;
                case 'price-per-transaction':
                    comparator = new PricePerTransactionComparator();
                    break;
                case 'transaction-count':
                    comparator = new TransactionCountComparator();
                    break;
                default:
                    res.send("no filter option")
                    return
            }

            res.setHeader('Content-Type', 'application/json');
            if (!sort && !orderBy) {
                res.send(blockchains);
            } else {
                let result
                if (orderBy === 'asc')
                    result = sorter.sortAscending(blockchains, comparator);
                else if (orderBy === 'desc')
                    result = sorter.sortDescending(blockchains, comparator);
                else {
                    res.send("Error: wrong option")
                }

                res.send(result);
            }
        } catch (err) {
            res.send("Error" + err);
        }
    }
}