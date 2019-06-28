const pool = require('../../../pgPool');

module.exports = class Account {
  constructor(firstName, lastName, email, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  static storeAccount({ firstName, lastName, email, password }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO account("firstName", "lastName", email, password) VALUES($1,$2,$3,$4)`,
        [firstName, lastName, email, password],
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
