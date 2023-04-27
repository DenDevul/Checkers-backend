import { Record } from 'pocketbase';

interface Game {
  fen: string;
  url: string;
  result: string;
  player1: {
    id: string;
    side: string;
  };
  player2: {
    id: string | null;
    side: string;
  };
}

interface GameRecord extends Record, Game {}

export { Game, GameRecord };
