import http from 'http';
import express, { Express } from 'express';
import morgan from 'morgan'; // logger
import { connectToDatabase } from './services/database.service';
import routes from './routes/metadatas';
import 'dotenv/config';

const PORT: any = process.env.PORT ?? 3000;

connectToDatabase();
const expressRouter: Express = express();
expressRouter.use(morgan('dev'));
expressRouter.use(express.urlencoded({ extended: false }));
expressRouter.use(express.json());

expressRouter.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  if (req.method === 'OPTIONS') {
    console.log('OPTIONS');
    res.header('Access-Control-Allow-Methods', 'GET POST');
    return res.status(200).json({});
  }
  next();
});

expressRouter.use('/', routes);

const httpServer = http.createServer(expressRouter);
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
