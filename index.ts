import './loadEnv.ts';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import router from './routes/index.ts';
import setupIo from './websocket/index.ts';
import { appLogger, logger } from './logger.ts';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const port = process.env.PORT;

app.use(cors({ origin: '*' }));
app.use(appLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

setupIo(io);

httpServer.listen(port, () => {
  logger.info(`Server is working on http://localhost:${port}/`);
});
