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
        `INSERT INTO account(email, password) VALUES($1,$2) RETURNING id, email`,
        [email, password],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Account Created.', account: res.rows[0] });
        }
      );
    });
  }

  static getAccountByEmail({ email }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, email, password FROM account
        WHERE email=$1`,
        [email],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Found Account.', account: res.rows[0] });
        }
      );
    });
  }

  static getAccountById({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT id, email FROM account
        WHERE id=$1`,
        [id],
        (err, res) => {
          if (err) return reject(err);
          resolve({ message: 'Found Account.', account: res.rows[0] });
        }
      );
    });
  }
};

// Account.storeAccount({ email: 'd@d.com', password: '123456' }).then(
//   ({ account }) => console.log('account', account)
// );
