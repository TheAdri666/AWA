import { Request, Response } from 'express';

interface TodoList {
  id: number;
  todos: string[];
}

const todoLists: TodoList[] = [];

function addTodos(req: Request, res: Response) {
  if (!req.session.user) {
    res.status(401).send('Unauthorized');
    return;
  }

  const { todo } = req.body;

  const userTodoList: TodoList | undefined = todoLists.find((todoList) => todoList.id === req.session.user!.id);

  if (userTodoList) {
    userTodoList.todos.push(todo);
    res.send(userTodoList);
    return;
  }

  const newTodoList: TodoList = {
    id: req.session.user.id,
    todos: [todo]
  };
  todoLists.push(newTodoList);
  res.send(newTodoList);
  return;
}

function listTodos(req: Request, res: Response) {
  if (!req.session.user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }
  const allTodos: TodoList[] = [];
  for (const list of todoLists) {
    allTodos.push(list);
  }
  res.send(allTodos);
  return;
}

export {
  addTodos,
  listTodos,
}
