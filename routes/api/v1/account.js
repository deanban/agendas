const express = require('express');
const Account = require('../../../models/api/v1/account');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();

router.post('/register', (req, res, next) => {
  passport.authenticate('register', (err, user, info) => {
    if (err) throw err;
    if (info !== undefined) res.send(info.message);
    req.logIn((user, err) => {
      const { email, password } = req.body;
      Account.getAccountByEmail({ email: user.username });
    });
  });
});

module.exports = router;
