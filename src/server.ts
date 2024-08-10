import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
dotenv.config();

import { createNewUser, signin } from './handlers/user';
import { protect } from './modules/auth';
import router from './router';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'hello' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).send({ message: 'unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'invalid input' });
  } else {
    res.status(500).json({ message: "oops, that's on us" });
  }
});

export default app;
