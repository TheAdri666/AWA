import { Router } from 'express';
import * as HelloCtrl from '../controllers/helloController';

const helloRouter: Router = Router();

helloRouter
  .route('/')
  .get(HelloCtrl.helloWorld);

export default helloRouter;

