import { Router } from 'express';
import * as TodoListCtrl from '../controllers/todoListController';
import { authenticateJWT } from '../authenticateJWT';

const todoListRouter: Router = Router();

todoListRouter
  .route('/')
  .post(authenticateJWT, TodoListCtrl.addTodos);

export default todoListRouter;
