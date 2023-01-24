import { Request, Response } from 'express';

interface Todo {
  name: string;
  description: string;
}

interface TodoList {
  id: number;
  todos: Todo[];
}

let todoLists: TodoList[] = [];

function addTodos(req: Request, res: Response) {
  if (!req.session.user) {
    res.status(401).send('Unauthorized');
    return;
  }

  const { todos } = req.body;

  const userTodoList = todoLists.find((todoList) => todoList.id === req.session.user!.id);

  if (userTodoList) {
    userTodoList.todos.push(...todos);
    res.send(userTodoList);
  } else {
    const newTodoList: TodoList = {
      id: req.session.user.id,
      todos
    };
    todoLists.push(newTodoList);
    res.send(newTodoList);
  }
}

function listTodos(req: Request, res: Response) {
  if (!req.session.user) {
    res.status(401).send({ msg: 'Unauthorized' });
    return;
  }

  const todos: Todo[] = [];
  for (const list of todoLists) {
    for (const todo of list.todos) {
      todos.push(todo);
    }
    res.status(200).send({ todos });
    return;
  }
}

export {
  addTodos,
  listTodos,
}
