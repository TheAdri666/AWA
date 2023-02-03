import express, { Express, Request, Response } from 'express';
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
app.use('/api/todos', todoListRouter)
app.use('/api/private', privateRouter)

export default app;
