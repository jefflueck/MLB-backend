# MLB Dream Team

---

[Click Here to See Deployed Version](http://mlb-dream-team.surge.sh/)

## Features

---

- User registration with a encryped password.
- Teams per user stored on off site Database allow access from anywhere with internet or cellular connection.
- Team creation, Team deletion, User names their own teams.
- User has no limit of saved teams.
- Rosters from MLB API with historical players or current players from any year of a MLB Team that existed at that time.
- Able to mix and match players from different years and teams when creating a team.
- All Teams delete upon user profile deletion.

## Application Flow

1. User registers for a free account on the register page.

2. User is brought to the main interactive page for building a team.

3. A TEAM NAME is displayed above a baseball field with default positions holders on the baseball field.

4. User inputs a year and clicks submit.

5. Page is dynamically replaced with list of MLB Teams current for the given year.

6. User picks a listed team by clicking on team. Page dynamically renders a roster provide by [MLB API](https://appac.github.io/mlb-data-api-docs/) of that teams roster.

- The roster will show players name and assigned position on the field with a + to add them to your baseball field.

7. User can go back to steps 4 - 6 as much as they want to get different players from different teams and different years to build their ultimate team of their dreams.

- Player does this thought the same inputs without having to go back in the browser navigation.

8. Once happy with their dream team, they can use the provided input and name their team.

- User can also do this step 8 at any time in the process of building a team.

9. When the user has done all the steps and are happy with their Dream Team they can click Add Team to Franchise button and it will be stored on a Database tied to their user account as long as they have an account.

10. A user can click the Franchise button at anytime to see all of their created teams by name.

- The user will have the option to delete any team they created from this page, or click on the team name to see the baseball field with all of the players on the field.

- When a user clicks the **DELETE USER Button** the user and **ALL OF THEIR TEAMS** are permentaly deleted from the Database.

## Tech Stack

---

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/en/main)
- [MLB API](https://appac.github.io/mlb-data-api-docs/)
- [Axoios](https://axios-http.com/docs/intro)
- [Express](https://expressjs.com/)
- PostgreSQL
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- JavaScript
- HTML
- CSS
