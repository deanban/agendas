const express = require('express');
const Account = require('../../../models/api/v1/account');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const jwtSec = require('../../../config/jwtSec');

const router = express.Router();

router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  async (req, res, next) => {
    console.log(req.user);
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  }
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An Error occured');
        return next(error);
      }
      req.login(user, { session: false }, async error => {
        if (error) return next(error);
        const body = { id: user.id, email: user.username };
        //Sign the JWT token and populate the payload with the user email and id
        const token = jwt.sign({ user: body }, jwtSec.jwtKey);
        //Send back the token to the user
        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// router.post('/register', (req, res, next) => {
//   // console.log(req);
//   passport.authenticate('register', (err, user, info) => {
//     // console.log('user', user);
//     if (err) throw err;
//     if (info !== undefined) res.send(info.message);
//     req.logIn(user, err => {
//       // console.log('userasdfasdfljahsdkfjbasdkjb', user);
//       if (err) {
//         return next(err);
//       }
//       res.json({ account: account });
//     });
//   })(req, res, next);
// });

module.exports = router;
