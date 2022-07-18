import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { MockDb } from '@mattellis91/mockdb';
 
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/api/articles', require('./routes/articles'));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  console.log(MockDb.connect('demo-db'));
});