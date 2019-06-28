const pool = require('../../../pgPool');

module.exports = class Account {
  constructor(email, password) {
    // this.userName = userName;
    this.email = email;
    this.password = password;
  }

  static storeAccount({ email, password }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account(email, password) VALUES($1,$2)`,
        [email, password],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Account Created.' });
        }
      );
    });
  }

  static getAccountByEmail({ email }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, "firstName", "lastName", email FROM account
        WHERE email=$1`,
        [email],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Found Account.', account: res.rows[0] });
        }
      );
    });
  }
};
