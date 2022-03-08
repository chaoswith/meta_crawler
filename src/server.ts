import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan'; //logger
import { connectToDatabase } from "./services/database.service"
import routes from './routes/metadatas';
import 'dotenv/config'

const PORT: any = process.env.PORT ?? 3000;

connectToDatabase();
const express_router: Express = express();
express_router.use(morgan('dev'));
express_router.use(express.urlencoded({ extended: false }));
express_router.use(express.json());

express_router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    if (req.method === 'OPTIONS') {
        console.log('OPTIONS')
        res.header('Access-Control-Allow-Methods', 'GET POST');
        return res.status(200).json({});
    }
    next();
});

express_router.use("/", routes);

const httpServer = http.createServer(express_router);
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));



