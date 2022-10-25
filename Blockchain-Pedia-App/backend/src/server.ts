import express, {Express} from 'express';
import {Endpoints} from "./web/endpoints";
import {ErrorHandlerMiddleware} from "./web/middleware/error-handler-middleware";
import {BlockchainController} from "./web/controller/blockchain-controller";
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 8000;

// Express middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('json spaces', 4);

// Register API routes
app.get(Endpoints.DEFAULT, BlockchainController.hello);

// Error Handling middleware
app.use(ErrorHandlerMiddleware.handleError);

app.listen(port, () => {
    console.log('⚡️[server]: Server is running at http://localhost:' + `${port}`);
});