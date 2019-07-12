const express = require('express');
const Account = require('../../../models/api/v1/account');
const jwt = require('jsonwebtoken');
const passport = require('passport');

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
