import { Server } from 'socket.io';
import { logger } from '../logger.ts';
import './controller.ts';
import { insertGame, updateGame, findGame } from './controller.ts';

export default function setupIo(io: Server) {
  io.use((socket, next) => {
    const { userId, gameUrl } = socket.handshake.auth;
    if (!userId || !gameUrl) {
      logger.debug('rejected by middleware');
      const er = new Error('auth not provided');
      return next(er);
    }
    next();
  });

  io.on('connection', async (socket) => {
    const auth = socket.handshake.auth;
    const userId: string = auth.userId;
    const gameUrl: string = auth.gameUrl;
    const createGame = auth.createGame;

    logger.debug(userId + ' connected');
    logger.debug(socket.handshake.auth);

    socket.on('disconnect', () => {
      logger.debug(userId + ' disconnected');
    });

    if (createGame) {
      await insertGame(auth);
      socket.join(gameUrl);
      logger.debug(userId + ' joined room ' + gameUrl);
      return;
    }

    const game = await findGame(gameUrl);
    const room = io.sockets.adapter.rooms.get(gameUrl);

    if (game?.creator === userId) {
      socket.join(gameUrl);
      socket.to(gameUrl).emit('player-connect');
      logger.debug(userId + ' joined room ' + gameUrl);
    } else if (room?.size === 1 || (game && !game.player2.id)) {
      await updateGame(game, auth);

      socket.join(gameUrl);
      socket.to(gameUrl).emit('player-connect');
      logger.debug(userId + ' joined room ' + gameUrl);
    } else {
      socket.disconnect(true);
    }
  });
}
