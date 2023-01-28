import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User } from "../models/userModel";
import { validationResult } from 'express-validator';

async function register(req: Request, res: Response) {
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(403).send({ email: "Email already in use." });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = new User({
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function login(req: Request, res: Response) {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send("Email or password is incorrect");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(401).send("Email or password is incorrect");
  }
  const jwtPayload = {
    id: user._id,
    email: user.email
  }
  const token = jwt.sign(jwtPayload, process.env.SECRET!, { expiresIn: "1h" });
  res.json({ token });
}

export {
  register,
  login
}
