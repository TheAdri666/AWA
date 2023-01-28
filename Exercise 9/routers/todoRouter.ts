import { Router } from 'express';
import * as TodoListCtrl from '../controllers/todoListController';
import passport from 'passport';

const todoListRouter: Router = Router();

todoListRouter
  .route('/')
  .post(passport.authenticate("jwt", { session: false }), TodoListCtrl.addTodos);

export default todoListRouter;
