import { Router } from 'express';
import * as UserCtrl from '../controllers/userController';
import { check } from "express-validator";

const userRouter: Router = Router();

userRouter
  .route('/register')
  .post([
    check("email", "Please enter a valid email address").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol: ~`!@#$%^&*()-_+={}[]|;:\"<>,./?"
    ).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#\$%\^&\*\(\)-_\+=\{\}\[\]\|;:"<>,\.\/\?]).{8,}$/
    )
  ], UserCtrl.register);

userRouter
  .route('/login')
  .post(UserCtrl.login);

export default userRouter;

