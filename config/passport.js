const bcrypt = require('bcryptjs');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const jwtSec = require('./jwtSec');
const Account = require('../models/api/v1/account');

const localStrategyOpts = {
  usernameField: 'email',
  passwordField: 'password',
  session: false
};

module.exports = passport => {
  passport.use(
    'register',
    new LocalStrategy(localStrategyOpts, (email, password, done) => {
      try {
        Account.getAccountByEmail({ email }).then(({ account }) => {
          if (account)
            return done(null, false, { message: 'Email already taken' });
          else {
            const hash = bcrypt.hashSync(password, jwtSec.saltRounds);

            Account.storeAccount({ email, hash }).then(() => {
              done(null);
            });
          }
        });
      } catch (error) {
        done(error);
      }
    })
  );
};
