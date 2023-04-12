import { Db, MongoClient } from 'mongodb';
import { logger } from '../logger.ts';

const uri = process.env.CONNECTION_STRING || '';

const client = new MongoClient(uri);

let _db: Db;

async function connectDb() {
  if (!_db) {
    try {
      await client.connect();
      _db = client.db('checkers');
      logger.info('Connected to DB');
    } catch (er) {
      logger.error('Error connecting to DB ', er)
      throw er;
    }
  }
  return _db;
}

export { connectDb };
