import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { User } from './models/userModel';
import userRouter from './routers/userRouter';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secretkey",
  passReqToCallback: true
};

passport.use(
  new JWTStrategy(jwtOptions, async (req: Request, payload: { _id: string; }, done: Function) => {
    try {
      // Find the user specified in token
      const user = await User.findById(payload._id);
      if (!user) {
        return done(null, false);
      }
      req.user = user;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

const authenticateJWT = (req: Request, res: Response, next: Function) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.user = user;
    next();
  })(req, res, next);
};

app.use('/api/user', userRouter);

export default app;
