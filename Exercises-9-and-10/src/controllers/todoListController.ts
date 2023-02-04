import { Request, Response } from 'express';
import { TodoList } from '../models/TodoList';
import { CustomRequest } from '../authenticateJWT';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/User';

async function addTodos(req: Request, res: Response) {
  const token = (req as CustomRequest).token as JwtPayload;
  const user = await User.findOne({ email: token.email });
  if (!user) {
    res.status(400).send({ msg: 'Something went wrong' });
  }
  const { items } = req.body;
  try {
    const todoList = await TodoList.findOne({ user });
    if (todoList) {
      todoList.items = [...todoList.items, ...items];
      await todoList.save();
    } else {
      const newTodoList = new TodoList({ user, items });
      await newTodoList.save();
    }
    res.json({ message: 'Todo list created/updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating/updating todo list' });
  }
}

async function getUserTodoList(req: Request, res: Response) {
  const token = (req as CustomRequest).token as JwtPayload;
  const user = await User.findOne({ email: token.email });
  const todoList = await TodoList.findOne({ user });

  if (!todoList) {
    return res.send(new TodoList());
  }
  return res.send(todoList);
}

export {
  addTodos,
  getUserTodoList,
}
