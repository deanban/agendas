const pool = require('../../../pgPool');

const TASK_DEFAULTS = {};

Object.defineProperties(TASK_DEFAULTS, {
  title: { get: () => undefined },
  body: { get: () => undefined },
  accountId: { get: () => undefined },
  projectId: { get: () => undefined },
  personalId: { get: () => undefined }
});

module.exports = class Task {
  constructor({ title, body, accountId, projectId, personalId }) {
    this.title = title || TASK_DEFAULTS.title;
    this.body = body || TASK_DEFAULTS.body;
    this.accountId = accountId || TASK_DEFAULTS.accountId;
    this.projectId = projectId || TASK_DEFAULTS.projectId;
    this.personalId = personalId || TASK_DEFAULTS.personalId;
  }

  static storeTaskForProj({ accountId, title, body, projectId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO task("accountId", title, body, "projectId")
      VALUES($1,$2,$3,$4) RETURNING id, title, body, done, "inProgress"
      "projectId", "createdAt"`,
        [accountId, title, body, projectId],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: `Task for ${title} Created`, task: res.rows[0] });
        }
      );
    });
  }

  static storeTaskForPersonal({ accountId, title, body, personalId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO task("accountId", title, body, "personalId"")
      VALUES($1,$2,$3,$4) RETURNING id, title, body, done, "inProgress"
      "personalId", "createdAt"`,
        [accountId, title, body, personalId],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: `Task for ${title} Created`, task: res.rows[0] });
        }
      );
    });
  }

  static getTaskByTitle({ title, projectId, personalId }) {
    if (projectId) {
      return new Promise((resolve, reject) => {
        pool.query(
          `SELECT id, title FROM task WHERE title=$1 AND "projectId"=$2`,
          [title, projectId],
          (err, res) => {
            if (err) return reject(err);
            console.log(res.rows[0]);
            resolve({ message: 'Task Exists', task: res.rows[0] });
          }
        );
      });
    } else if (personalId) {
      return new Promise((resolve, reject) => {
        pool.query(
          `SELECT id, title FROM task WHERE title=$1 AND "personalId"=$2`,
          [title, personalId],
          (err, res) => {
            if (err) return reject(err);
            console.log(res.rows[0]);
            resolve({ message: 'Task Exists', task: res.rows[0] });
          }
        );
      });
    }
  }
};
