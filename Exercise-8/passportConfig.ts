import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs'
import { findUserById, findUserByName } from './controllers/userController';
import { PassportStatic } from 'passport';

function initializePassport(passport: PassportStatic) {
  const authenticateUser = (username: string, password: string, done: Function) => {
    const user = findUserByName(username)
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }
    if (bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: 'Invalid credentials' });
    };
  }

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: number, done: Function) => {
    const user = findUserById(id);
    done(null, user);
  });

  passport.use(new LocalStrategy(authenticateUser));
}

export {
  initializePassport,
}
