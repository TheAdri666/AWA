import express, { Express } from 'express';
import vehicleRouter from './routers/vehicleRouter';
import helloRouter from './routers/helloRouter';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/vehicle', vehicleRouter);
app.use('/hello', helloRouter);

export default app;
