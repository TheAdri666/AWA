import { Router } from 'express';
import * as PrivateCtrl from '../controllers/privateController';
import { authenticateJWT } from '../authenticateJWT';

const privateRouter: Router = Router();

privateRouter
  .route('/')
  .get(authenticateJWT, PrivateCtrl.access);

export default privateRouter;
