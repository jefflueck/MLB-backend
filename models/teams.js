'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for companies. */

class Team {
  // All team sql queries are in this file

  // create a team with logged in user
  // submit team to db
  // tie used id to user_id FK in teams table

  static async create(
    userId,
    { name, first, second, third, ss, c, lf, cf, rf, p }
  ) {
    const result = await db.query(
      `INSERT INTO teams (name, first, second, third, ss, c, lf, cf, rf, p, user_id )
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           RETURNING id, name, first, second, third, ss, c, lf, cf, rf, p`,
      [name, first, second, third, ss, c, lf, cf, rf, p, userId]
    );
    let team = result.rows[0];
    console.log(team);
    return team;
  }

  // Find all teams for a particular user
  // see routes/teams.js for route and params

  static async findAll(user_id) {
    const allUsersTeams = await db.query(
      `SELECT id,
                  name,
                  first,
                  second,
                  third,
                  ss,
                  c,
                  lf,
                  cf,
                  rf,
                  p
            FROM teams
            WHERE user_id = $1`,
      [user_id]
    );
    console.log(allUsersTeams.rows);
    return allUsersTeams.rows;
  }

  // Find a single team by id
  // this should happen when the user clicks on a team
  // * works on backend right now with postman
  // see routes/teams.js for route and params

  static async get(id) {
    const singleTeam = await db.query(
      `SELECT id,
                  name,
                  first,
                  second,
                  third,
                  ss,
                  c,
                  lf,
                  cf,
                  rf,
                  p
            FROM teams
            WHERE id = $1`,
      [id]
    );
    return singleTeam.rows[0];
  }

  // Update an existing team if it exists
  // allow for partial updates
  // send back the updated team
  // send message back if team does not exist

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(data, {
      name: 'name',
      first: 'first',
      second: 'second',
      third: 'third',
      ss: 'ss',
      c: 'c',
      lf: 'lf',
      cf: 'cf',
      rf: 'rf',
      p: 'p',
    });
    const idVarIdx = '$' + (values.length + 1);

    const querySql = `UPDATE teams
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                name,
                                first,
                                second,
                                third,
                                ss,
                                c,
                                lf,
                                cf,
                                rf,
                                p`;
    const result = await db.query(querySql, [...values, id]);
    const team = result.rows[0];

    if (!team) throw new NotFoundError(`No team: ${id}`);

    return team;
  }

  static async remove(id) {
    const result = await db.query(
      `DELETE
           FROM teams
           WHERE id = $1
           RETURNING id`,
      [id]
    );
    const team = result.rows[0];

    if (!team) throw new NotFoundError(`No team: ${id}`);
  }
}

module.exports = Team;
