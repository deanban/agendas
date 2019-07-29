const express = require('express');
const Task = require('../../../models/api/v1/task');

const passport = require('passport');

const router = express.Router();

router.post(
  '/new',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const { title, body, projectId, personalId } = req.body;
    const newTask = {
      title: title,
      body: body,
      accountId: req.user.id,
      projectId: projectId,
      personalId: personalId
    };

    Task.getTaskByTitle(newTask)
      .then(({ message, task }) => {
        if (task && task.length > 0) {
          res.json({ message, task });
        } else {
          if (projectId) {
            Task.storeTaskForProj(newTask)
              .then(({ message, task }) => {
                res.json({
                  message,
                  task
                });
              })
              .catch(err => {
                throw err;
              });
          } else if (personalId) {
            Task.storeTaskForPersonal(newTask)
              .then(({ message, task }) => {
                res.json({
                  message,
                  task
                });
              })
              .catch(err => {
                throw err;
              });
          }
        }
      })
      .catch(err => next(err));
  }
);

module.exports = router;
