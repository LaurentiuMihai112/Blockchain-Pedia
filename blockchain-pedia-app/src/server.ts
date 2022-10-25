import express, {Express} from 'express';
import {Endpoints} from "./web-component/endpoints";
import {DefaultMiddleware} from "./web-component/middlewares/default-middleware";
import {BlockchainController} from "./web-component/controllers/blockchain-controller";
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 8000;

/************************************************************************************
 *                              Basic Express Middlewares
 ***********************************************************************************/
//
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('json spaces', 4);


/************************************************************************************
 *                               Register all REST routes
 ***********************************************************************************/

app.get(Endpoints.DEFAULT, BlockchainController.hello);

/************************************************************************************
 *                               Express Error Handling
 ***********************************************************************************/
app.use(DefaultMiddleware.errorHandler);

app.listen(port, () => {
    console.log('⚡️[server]: Server is running at http://localhost:' + `${port}`);
});