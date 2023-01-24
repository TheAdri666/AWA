import { Router } from 'express';
import * as SecretCtrl from '../controllers/secretController';

const secretRouter: Router = Router();

secretRouter
  .route('/')
  .get(SecretCtrl.accessSecretPath);

export default secretRouter;
