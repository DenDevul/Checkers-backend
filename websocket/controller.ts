import { nanoid } from 'nanoid';
import pb from '../db/index.ts';
import { Game, GameRecord } from '../db/model.ts';
import { logger } from '../logger.ts';

const games = pb.collection('games');

async function createGame(requisites: {
  newGame?: {
    userId: string;
    gameUrl: string;
    fen: string;
    side: string;
  };
  restart?: { gameUrl: string; fen: string };
}): Promise<GameRecord | undefined> {
  let game!: Game;
  if (requisites.newGame) {
    const { userId, gameUrl, fen, side } = requisites.newGame;
    game = {
      fen: fen,
      url: gameUrl,
      result: '*',
      player1: {
        id: userId,
        side: side
      },
      player2: {
        id: null,
        side: side === 'white' ? 'black' : 'white'
      }
    };
  } else if (requisites.restart) {
    const { gameUrl, fen } = requisites.restart;
    const oldGame = (await findGame(gameUrl))!;
    game = {
      fen: fen,
      url: nanoid(12),
      result: '*',
      player1: oldGame.player1,
      player2: oldGame.player2
    };
  }
  try {
    logger.debug(game);
    const createdGame: GameRecord = await games.create(game);
    logger.info('Record created');
    return createdGame;
  } catch (e) {
    logger.error(e);
  }
}

async function updateGame(update: {
  gameUrl: string;
  userId?: string;
  newFen?: string;
  result?: string;
}): Promise<GameRecord | undefined> {
  const { gameUrl, userId, newFen, result } = update;

  try {
    let game = await findGame(gameUrl);
    if (!game) return;

    if (userId) game.player2.id = userId;
    else if (newFen) game.fen = newFen;
    else if (result) game.result = result;

    const updatedGame: GameRecord = await games.update(game.id, game);
    logger.info('Record updated');
    return updatedGame;
  } catch (e) {
    logger.error(e);
    return;
  }
}

async function findGame(gameUrl: string): Promise<GameRecord | undefined> {
  try {
    return await games.getFirstListItem<GameRecord>(`url = "${gameUrl}"`);
  } catch (e) {
    logger.error(e);
    return;
  }
}

export { createGame, updateGame, findGame };
