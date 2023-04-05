import { Request, Response } from 'express';
import { getDb } from '../db';

async function get(req: Request, res: Response) {
  let collection = getDb().collection("games");
  let query = {gameUrl: req.query.gameUrl};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
  
  // TODO: generate unique url to game and create room for 2 players 
}

export { get };
