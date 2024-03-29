import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter';
import todoListRouter from './routers/todoListRouter';
import privateRouter from './routers/privateRouter';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter);
app.use('/api/todos', todoListRouter);
app.use('/api/private', privateRouter);

app.use(express.static('public'));
app.use('/', express.static('public', { index: 'home.html' }));

export default app;
