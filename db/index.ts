import { Db, MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING || '';

const client = new MongoClient(uri);

let _db: Db;

async function connectDb() {
  try {
    await client.connect();
    _db = client.db('checkers');

    console.log('Connected to DB');
  } catch (er) {
    throw er
  }
}

function getDb() {
  return _db;
}

export { connectDb, getDb };
