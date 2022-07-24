import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { MockDb } from '@mattellis91/mockdb';
 
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json())

app.use('/api/articles', require('./routes/articles'));
app.use('/api/users', require('./routes/users'));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  const dbConnection = MockDb.connect('demo-db');
  app.locals.dbConnection = dbConnection;
});