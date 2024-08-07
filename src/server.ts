import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv'
dotenv.config()

import router from './router';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from express' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser)
app.post('/signin', signin);

export default app;
