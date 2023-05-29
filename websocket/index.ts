import { Server } from 'socket.io';
import { logger } from '../logger.ts';
import './controller.ts';
import { createGame, updateGame, findGame } from './controller.ts';

export default function setupIo(io: Server) {
  io.use((socket, next) => {
    const { userId } = socket.handshake.auth;
    if (!userId) {
      logger.debug('rejected by middleware');
      const er = new Error('user id not provided');
      return next(er);
    }
    next();
  });

  io.on('connection', async (socket) => {
    const userId: string = socket.handshake.auth.userId;

    socket.onAny((ev) => {
      logger.debug(`event: ${ev}`);
    });

    logger.debug(userId + ' connected');

    socket.on('disconnect', () => {
      logger.debug(userId + ' disconnected');
    });

    socket.on(
      'init game',
      (data: { fen: string; side: string; gameUrl: string }) => {
        const gameUrl = data.gameUrl;
        createGame({ ...data, userId });

        socket.rooms.forEach((room) => {
          if (room !== socket.id) socket.leave(room);
        });
        socket.join(gameUrl);
        logger.debug(userId + ' joined room ' + gameUrl);
      }
    );

    socket.on('request game', async (gameUrl: string, callback) => {
      logger.debug(userId + ' requesting game');
      const game = await findGame(gameUrl);
      if (!game) {
        callback();
        return;
      }

      if (!game.player2.id && game.player1.id !== userId) {
        updateGame({ userId, gameUrl });
      } else if (game.player1.id !== userId && game.player2.id !== userId) {
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

    socket.on('next move', async (gameUrl: string, newFen: string) => {
      const game = await updateGame({ gameUrl, newFen });
      if (!game) {
        io.to(socket.id).emit('error', 'Server Error');
        return;
      }
      socket.to(gameUrl).emit('next move', newFen);
    });

    socket.on('end game', async (gameUrl: string, result: string) => {
      const game = await updateGame({ gameUrl, result });
      if (!game) {
        io.to(socket.id).emit('error', 'Server Error');
        return;
      }
      socket.to(gameUrl).emit('end game', result);
    });

    socket.on('offer draw', (gameUrl) => {
      socket.to(gameUrl).emit('offer draw');
    });
  });
}
