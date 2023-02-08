'use strict';

/** Routes for teams. */

const express = require('express');
// const { all } = require('../app');

const { BadRequestError } = require('../expressError');
const { ensureLoggedIn } = require('../middleware/auth');
const Team = require('../models/teams');

const router = new express.Router();

// * all routes are preceded by /teams

// post a new team

router.post('/', async function (req, res, next) {
  try {
    console.log(req.body);
    const { userId, teamData } = req.body;
    const team = await Team.create(userId, teamData);
    // * team is an object with the following keys
    /** {team: {
      name: team1,
      first: player 1,
      second: player 2,
      third: player 3,
      ss: player 4,
      c: player 5,
      lf: player 6,
      cf: player 7,
      rf: player 8,
      p: player 9
    }}
    */
    return res.status(201).json({ team });
  } catch (err) {
    return next(err);
  }
});

// get a team by id
// * teams/:id
// :id is the team id

router.get('/:id', async function (req, res, next) {
  try {
    console.log(req.body);
    console.log(req.params.id);
    const team = await Team.get(req.params.id);
    // console.log(team);
    return res.json({ team });
  } catch (err) {
    return next(err);
  }
});

// get all teams by user_id key

router.get('/user/:id', async function (req, res, next) {
  try {
    console.log(req.body);
    console.log(req.params.id);
    // * holding the response in the variable allTeams and returning it.
    // * allTeams is an array of objects and can be used by the front end
    const allTeams = await Team.findAll(req.params.id);
    return res.json({ userTeams: allTeams });
    // { userTeams: [{team1}, {team2}, {team3}
  } catch (err) {
    return next(err);
  }
});

// delete a team by id

// * teams/:name or teams/:id

router.delete('/:teamId', async function (req, res, next) {
  try {
    await Team.remove(req.params.teamId);
    return res.json({ deleted: req.params.teamId });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
