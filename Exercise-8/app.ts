import express, { Express, Request, Response } from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter';
import todoRouter from './routers/todoRouter';
import secretRouter from './routers/secretRouter';
import passport from 'passport';
import { initialize } from 'passport';
import { initializePassport } from './passportConfig';

declare module 'express-session' {
  export interface SessionData {
    user: {
      username: string,
      password: string,
      id: number
    };
  }
}

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

initializePassport(passport);
app.use(session({
  secret: process.env.SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/redirect', (req: Request, res: Response) => {
  res.send({ msg: 'You were redirected here for some reason. Go back!' });
})
app.use('/api/user', userRouter);
app.use('/api/todos', todoRouter);
app.use('/api/secret', secretRouter);

export default app;
