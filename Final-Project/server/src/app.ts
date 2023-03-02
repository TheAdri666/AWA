import express, { Express } from 'express';
import dotenv from 'dotenv';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



export default app;
