import {Express} from "express";
import {Endpoints} from "./endpoints";
import {BlockchainController} from "./controller/blockchain-controller";
import {logRequestMiddleware} from "./middleware/logging-middleware";
import {DataChartController} from "./controller/data-chart-controller";
import {handleError} from "./middleware/error-handler-middleware";
import {checkRequestMiddleware} from "./middleware/checker-middleware";

export default function (app: Express) {

    // Get the list of Blockchains
    app.get(Endpoints.BLOCKCHAINS, logRequestMiddleware, checkRequestMiddleware, BlockchainController.getAllBlockchains);

    // Generate data chart
    app.get(Endpoints.DATA_CHART_ORDER, DataChartController.getChartForOrder)
    app.get(Endpoints.DATA_CHART_FILTER, DataChartController.getChartForFilter)
    app.get(Endpoints.DATA_CHART_SORT, DataChartController.getChartForSort)
    app.get(Endpoints.DATA_CHAR_FILE, DataChartController.getChartFile)

    // Error handler for request time out
    app.use(handleError)
}