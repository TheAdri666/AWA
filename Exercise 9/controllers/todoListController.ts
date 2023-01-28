import { Request, Response } from 'express';
import { TodoList } from '../models/todoModel';
import mongoose from 'mongoose';

async function addTodos(req: Request, res: Response) {
  const user = req.user as mongoose.Types.ObjectId;
  const { items } = req.body;
  try {
    const todo = await TodoList.findOne({ user });
    if (todo) {
      todo.items = [...todo.items, ...items];
      await todo.save();
    } else {
      const newTodo = new TodoList({ user, items });
      await newTodo.save();
    }
    res.json({ message: "Todo list created/updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating/updating todo list" });
  }
}

export {
  addTodos,
}
