import express, {Express} from 'express';
import routes from "./web/routes"
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = 8000;
const cors = require('cors');

// Express middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
    origin: 'http://blockchainpedia-frontend.s3.eu-central-1.amazonaws.com'
}));
app.set('json spaces', 4);


app.listen(port, () => {
    console.log('⚡️[server]: Server is running at http://localhost:' + `${port}`);
    routes(app);
});
