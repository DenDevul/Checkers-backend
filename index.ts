import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('TypeScript With Express');
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});
