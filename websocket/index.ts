import { Server } from 'socket.io';
import { logger } from '../logger.ts';
import './controller.ts';
import { createGame, updateGame, findGame } from './controller.ts';

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
    const userId: string = socket.handshake.auth.userId;
    const gameUrl: string = socket.handshake.auth.gameUrl;

    socket.onAny((ev) => {
      logger.debug(`event: ${ev}`);
    });

    logger.debug(userId + ' connected');
    logger.debug(socket.handshake.auth);

    socket.on('disconnect', () => {
      logger.debug(userId + ' disconnected');
    });

    socket.on('init game', (requisites: { fen: string; side: string }) => {
      const requisitesWithAuth = { ...requisites, userId, gameUrl };
      createGame(requisitesWithAuth);

      socket.join(gameUrl);
      logger.debug(userId + ' joined room ' + gameUrl);
    });

    socket.on('request game', async (callback) => {
      logger.debug(userId + ' requesting game');
      const game = await findGame(gameUrl);
      if (!game) {
        callback();
        return;
      }

      if (!game.player2.id && game.player1.id !== userId) {
        updateGame({ userId, gameUrl });
      } else if (game.player1.id !== userId && game.player2.id !== userId) {
        logger.debug('here?');
        socket.disconnect(true);
        return;
      }

      socket.join(gameUrl);
      socket.to(gameUrl).emit('player connect');
      logger.debug(userId + ' joined room ' + gameUrl);

      const playerSide: string =
        game.player1.id === userId ? game.player1.side : game.player2.side;

      callback({
        fen: game.fen,
        playerSide: playerSide,
        result: game.result
      });
    });

    socket.on('next move', async (newFen: string) => {
      const game = await updateGame({ userId, gameUrl }, { newFen });
      if (!game) {
        io.to(socket.id).emit('error', 'Server Error');
        return;
      }
      socket.to(gameUrl).emit('next move', newFen);
    });

    socket.on('end game', async (result: string) => {
      const game = await updateGame({ userId, gameUrl }, { result });
      if (!game) {
        io.to(socket.id).emit('error', 'Server Error');
        return;
      }
      socket.to(gameUrl).emit('end game', result);
    });
  });
}
