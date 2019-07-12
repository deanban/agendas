const express = require('express');
const Account = require('../../../models/api/v1/account');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

router.post('/register', (req, res, next) => {
  // console.log(req);
  passport.authenticate('register', (err, user, info) => {
    // console.log('user', user);
    if (err) throw err;
    if (info !== undefined) res.send(info.message);
    req.logIn((user, err) => {
      console.log('userasdfasdfljahsdkfjbasdkjb', user);
      const { email, password } = req.body;
      // Account.getAccountByEmail({ email });
      res.json({ message, account });
    });
  })(req, res, next);
});

module.exports = router;
