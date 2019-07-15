const express = require('express');
const Project = require('../../../models/api/v1/project');

const passport = require('passport');

const router = express.Router();

router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    // console.log(req.user);
    // console.log(req.body);
  }
);

module.exports = router;
