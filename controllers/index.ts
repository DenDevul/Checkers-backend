import { Request, Response } from 'express';
import { nanoid } from 'nanoid';

async function get(req: Request, res: Response) {
  const url = nanoid(12);
  res.send(url).status(200);
}

export { get };
