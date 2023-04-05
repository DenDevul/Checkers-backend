import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import morgan from 'morgan';

import router from './routes';
import setupIo from './websocket';
import { connectDb, getDb } from './db';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });

const port = process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

setupIo(io);

const start = async () => {
  try {
    await connectDb();

    httpServer.listen(port, () => {
      console.log(`Server is working on http://localhost:${port}/`);
    });
  } catch (er) {
    console.log(er);
  }
};

start();
