import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

interface User {
  id: number;
  username: string;
  password: string;
}

let users: User[] = [];

function generateId(): number {
  return users.length + 1;
}

function registerUser(req: Request, res: Response): void {
  if (req.session.user) {
    res.redirect('/');
    return;
  }

  const { username, password } = req.body;

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    res.status(400).send('Username already taken');
    return;
  }

  const hashedPassword = bcrypt.hashSync(password, 8);

  const newUser: User = {
    id: generateId(),
    username,
    password: hashedPassword,
  };
  users.push(newUser);

  res.status(200).send(newUser);
  return;
}

function loginUser(req: Request, res: Response): void {
  if (req.session.user) {
    res.redirect('/');
    return;
  }

  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);
  if (!user) {
    res.status(401).send('Invalid credentials');
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    res.status(401).send('Invalid credentials');
    return;
  }

  req.session.user = user;
  res.cookie('connect.sid', req.session.id);
  res.sendStatus(200);
  return;
}

function listUsers(req: Request, res: Response): void {
  res.send(users);
  return;
}

function findUserByName(username: string): User | undefined {
  const user: User | undefined = users.find((user) => user.username === username);
  return user;
}

function findUserById(id: number): User | undefined {
  const user: User | undefined = users.find((user) => user.id === id);
  return user;
}

export {
  registerUser,
  loginUser,
  listUsers,
  findUserByName,
  findUserById,
}