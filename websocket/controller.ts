import { connectDb } from '../db/index.ts';
import { logger } from '../logger.ts';

const db = await connectDb();
const games = db.collection('games');

async function insertGame(auth: any) {
  const [userId, gameUrl, side]: string[] = [
    auth.userId,
    auth.gameUrl,
    auth.createGame.side
  ];
  const createdGame = {
    player1: {
      id: userId,
      side: side
    },
    player2: {
      id: null,
      side: side === 'white' ? 'black' : 'white'
    },
    gameUrl: gameUrl,
    createdAt: new Date()
  };
  try {
    await games.insertOne(createdGame);
    logger.info('Document inserted');
  } catch (e) {
    logger.error(e);
  }
}

async function updateGame(game: any, auth: any) {
  const userId: string = auth.userId;
  const updated = {
    player2: {
      id: userId
    },
    updatedAt: new Date()
  };
  try {
    await games.updateOne(game, { $set: updated });
    logger.info('Document updated');
  } catch (e) {
    logger.error(e);
  }
}

async function findGame(gameUrl: string) {
  return await games.findOne({ gameUrl: gameUrl });
}

export { insertGame, updateGame, findGame };
