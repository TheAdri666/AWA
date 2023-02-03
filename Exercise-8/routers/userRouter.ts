import { Router } from 'express';
import * as UserCtrl from '../controllers/userController';

const userRouter: Router = Router();

userRouter
  .route('/register')
  .post(UserCtrl.registerUser);

userRouter
  .route('/list')
  .get(UserCtrl.listUsers);

userRouter
  .route('/login')
  .post(UserCtrl.loginUser);

export default userRouter;

