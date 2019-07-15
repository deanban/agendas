const express = require('express');
const Project = require('../../../models/api/v1/project');

const passport = require('passport');

const router = express.Router();

router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { title, body } = req.body;
    const newProject = {
      title: title,
      body: body,
      accountId: req.user.id
    };
    Project.getProjectByTitle(newProject)
      .then(({ message, project }) => {
        if (project) {
          res.json({
            message,
            project
          });
        } else {
          Project.storeProject(newProject)
            .then(({ message, project }) => {
              res.json({
                message,
                project
              });
            })
            .catch(err => {
              throw err;
            });
        }
      })
      .catch(err => next(err));
  }
);

module.exports = router;
