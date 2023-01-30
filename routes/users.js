'use strict';

/** Routes for users. */

const express = require('express');

const { BadRequestError } = require('../expressError');
const User = require('../models/users');
const { createToken } = require('../helpers/tokens');

const router = express.Router();

/** GET /[username] => { user }
 * Returns { username, password }
 **/

router.get(
  '/:username',

  async function (req, res, next) {
    try {
      console.log(req.params.username);
      const user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
);

/** Post to delete user and all associated teams by foreign key from teams table.
 * Returns { deleted: username }
 */

router.delete(
  '/:username',

  async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  }
);

//  Post to update user password
//  * future feature
//  TODO update user and maintain foreign key in teams table

module.exports = router;
