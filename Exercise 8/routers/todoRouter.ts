import { Router } from 'express';
import * as TodoCtrl from '../controllers/todoController';

const todoRouter: Router = Router();

todoRouter
  .route('/')
  .post(TodoCtrl.addTodos);

todoRouter
  .route('/list')
  .get(TodoCtrl.listTodos);

export default todoRouter;

