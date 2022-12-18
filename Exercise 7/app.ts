import express, { Express }  from 'express';
import vehicleRouter from './routers/vehicleRouter';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/vehicle', vehicleRouter);

app.use(express.static('public'));

export default app;
