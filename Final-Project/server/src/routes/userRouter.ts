import { Router } from 'express';
import * as UserCtrl from '../controllers/userController';

const userRouter: Router = Router();

userRouter.get('/:email', UserCtrl.findUserByEmail);
userRouter.get('/', UserCtrl.findAllUsers);
userRouter.post('/register', UserCtrl.register);
userRouter.post('/login', UserCtrl.login);

export default userRouter;
