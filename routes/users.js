'use strict';

/** Routes for users. */

const express = require('express');

const { BadRequestError } = require('../expressError');
const User = require('../models/users');
const { createToken } = require('../helpers/tokens');

const router = express.Router();

/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

// router.get('/', async function (req, res, next) {
//   try {
//     const users = await User.findAll();
//     return res.json({ users });
//   } catch (err) {
//     return next(err);
//   }
// });

/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin, jobs }
 *   where jobs is { id, title, companyHandle, companyName, state }
 *
 * Authorization required: admin or same user-as-:username
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

// get all users teams by teams with user_id foreign key

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or same-user-as-:username
 **/

// router.patch(
//   '/:username',

//   async function (req, res, next) {
//     try {
//       const validator = jsonschema.validate(req.body, userUpdateSchema);
//       if (!validator.valid) {
//         const errs = validator.errors.map((e) => e.stack);
//         throw new BadRequestError(errs);
//       }

//       const user = await User.update(req.params.username, req.body);
//       return res.json({ user });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

/** POST /[username]/jobs/[id]  { state } => { application }
 *
 * Returns {"applied": jobId}
 *
 * Authorization required: admin or same-user-as-:username
 * */

// router.post(
//   '/:username/jobs/:id',

//   async function (req, res, next) {
//     try {
//       const jobId = +req.params.id;
//       await User.applyToJob(req.params.username, jobId);
//       return res.json({ applied: jobId });
//     } catch (err) {
//       return next(err);
//     }
//   }
// );

module.exports = router;
