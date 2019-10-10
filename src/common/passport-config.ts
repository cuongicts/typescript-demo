import passport from 'passport';
import { User } from '../entity/user';
import { getRepository } from 'typeorm';

// errHandler = utilities.errHandler,
import bcrypt from 'bcrypt';

import { Strategy as LocalStrategy } from 'passport-local';

passport.serializeUser(function (user: User, done) {
  done(undefined, user.userId);
});

passport.deserializeUser((id, done) => {
  const userRepository = getRepository(User);
  userRepository.findOne(id).then((user) => {
    return done(undefined, user);
  }).catch((error) => {
    return done(error);
  });
});

passport.use('admin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  async (req, email, password, done) => {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ email: req.body.email});
    if (!user) {
      return done(undefined, false, {
        message: 'User does not exist'
      });
    }

    bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
      if (error) {
        return done(error);
      }

      if (!isMatch) {
        return done(undefined, false, {
          message: 'Invalid email or password'
        });
      }
      return done(undefined, user);
    });

  }));

passport.use('frontend', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
},
  async (req, email, password, done) => {
    const userRepository = getRepository(User);
    let user = await userRepository.findOne({ email: req.body.email });
    if (!user) {
      user = new User();
      user.email = req.body.email;
      user.password = req.body.password;

      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return done(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            return done(err);
          }
          user.password = hash;
          userRepository.save(user).then((u) => {
            return done(undefined, user);
          }).catch(error => done(error));
        });
      });
    } else {
      bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
        if (error) {
          return done(error);
        }

        if (!isMatch) {
          return done(undefined, false, {
            message: 'Invalid email or password'
          });
        }
        return done(undefined, user);
      });
    }
  }));
export default passport;