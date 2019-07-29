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
    pool.query(
      `INSERT INTO task(title, body, "accountId", "projectId")
      VALUES($1,$2,$3,$4) RETURNING id, title, body, done, "inProgress"
      "projectId", "createdAt"`,
      [accountId, title, body, projectId],
      (err, res) => {
        if (err) return reject(err);
        resolve({ message: `Task for ${title} Created`, task: res.rows[0] });
      }
    );
  }

  static storeTaskForPersonal({ accountId, title, body, personalId }) {
    pool.query(
      `INSERT INTO task(title, body, "accountId", "personalId")
      VALUES($1,$2,$3,$4) RETURNING id, title, body, done, "inProgress"
      "personalId", "createdAt"`,
      [accountId, title, body, personalId],
      (err, res) => {
        if (err) return reject(err);
        resolve({ message: `Task for ${title} Created`, task: res.rows[0] });
      }
    );
  }

  static getTaskByTitle({ title }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, title FROM task WHERE title=$1`,
        [title],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Task Exists', task: res.rows[0] });
        }
      );
    });
  }
};
