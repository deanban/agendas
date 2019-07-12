const bcrypt = require('bcryptjs');
const passport = require('passport');

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

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: jwtSec.jwtKey
};

passport.use(
  'register',
  new LocalStrategy(localStrategyOpts, (email, password, done) => {
    // console.log(typeof email, typeof password);
    try {
      Account.getAccountByEmail({ email }).then(({ account }) => {
        if (account)
          return done(null, false, { message: 'Email already taken' });
        else {
          const hash = bcrypt.hashSync(password, jwtSec.saltRounds);
          console.log(hash);

          Account.storeAccount({ email, password: hash }).then(
            ({ account }) => {
              passport.serializeUser(function(account, done) {
                done(null, account);
              });
              return done(null, account);
            }
          );
        }
      });
    } catch (error) {
      done(error);
    }
  })
);
passport.use(
  'login',
  new LocalStrategy(localStrategyOpts, (email, password, done) => {
    try {
      Account.getAccountByEmail({ email }).then(({ account }) => {
        if (account) {
          if (bcrypt.compareSync(password, account.password.trim())) {
            return done(null, user);
          } else {
            done(null, { message: 'Wrong password' });
          }
        } else {
          done(null, false, { message: 'Account not found.' });
        }
      });
    } catch (error) {
      done(error);
    }
  })
);
passport.use(
  'jwt',
  new JwtStrategy(opts, (jwt_payload, done) => {
    Account.getAccountById(jwt_payload)
      .then(({ account }) => {
        if (account) return done(null, user);
        else return done(null, false, { message: 'user not found' });
      })
      .catch(err => done(err));
  })
);
