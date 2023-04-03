'use strict';

const db = require('../db');
const bcrypt = require('bcrypt');
const { createToken } = require('../helpers/tokens');
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require('../expressError');

const { BCRYPT_WORK_FACTOR } = require('../config.js');

/** Related functions for users. */

class User {
  /** authenticate user with username, password.
   *
   * Returns { username }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                  password
           FROM users
           WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError('Invalid username/password');
  }

  /** Register user with data.
   *
   * Returns { username, firstName, lastName, email, isAdmin }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register({ username, password }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password
            )
           VALUES ($1, $2)
           RETURNING username AS "username"`,
      [username, hashedPassword]
    );

    const user = result.rows[0];

    return user;
  }

  // Used to verify if a user when logging in
  static async get(username) {
    const userRes = await db.query(
      `SELECT username, id
           FROM users
           WHERE username = $1`,
      [username]
    );
    console.log(userRes.rows);

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
    return user;
  }

  // delete user and all associated teams
  static async remove(username) {
    let result = await db.query(
      `DELETE
            FROM users
            WHERE username = $1
            RETURNING username`,
      [username]
    );
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
