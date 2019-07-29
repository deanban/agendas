const pool = require('../../../pgPool');

const PROJECT_DEFAULTS = {};

Object.defineProperties(PROJECT_DEFAULTS, {
  title: { get: () => undefined },
  body: { get: () => undefined },
  accountId: { get: () => undefined }
});

module.exports = class Project {
  constructor({ title, body, accountId } = {}) {
    this.title = title || PROJECT_DEFAULTS.title;
    this.body = body || PROJECT_DEFAULTS.body;
    this.accountId = accountId || PROJECT_DEFAULTS.accountId;
  }

  static storeProject({ title, body, accountId }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO project(title, body, "accountId")
         VALUES($1,$2,$3) returning id, title, body, done, "inProgress", "createdAt"`,
        [title, body, accountId],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Project Created', project: res.rows[0] });
        }
      );
    });
  }

  static getProjectByTitle({ title }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, title FROM project WHERE title=$1`,
        [title],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Project Exists', project: res.rows[0] });
        }
      );
    });
  }
};
