const { DataTypes } = require("sequelize");
const db = require("../db");

<<<<<<< Updated upstream
const Vote = db.define("Vote", {
});
=======
// A vote has no columns of its own beyond the defaults (id, createdAt, updatedAt).
// optionId gets added automatically by the Option.hasMany(Vote) association in
// models/index.js. A vote is really just "a row that points at one option" —
// counting an option's votes is literally counting how many rows point at it.
const Vote = db.define("Vote", {});
>>>>>>> Stashed changes

module.exports = Vote;
