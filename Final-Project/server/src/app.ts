import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import codeSnippetRouter from './routes/codeSnippetRouter';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRouter);
app.use('/api/codeSnippet', codeSnippetRouter);

export default app;
