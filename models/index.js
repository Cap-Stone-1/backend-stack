// This file is the ONLY place associations get set up. Individual model files
// (polls.js, options.js, votes.js) never require each other directly — if they did,
// we'd risk a circular require (A needs B, B needs A) that quietly breaks.
const db = require("./db");
const Poll = require("./polls");
const Option = require("./options");
const Vote = require("./votes");

// A poll has many options. allowNull: false means an option can't exist without
// a pollId — the database itself will reject that row, not just our code.
Poll.hasMany(Option, {
  foreignKey: { name: "pollId", allowNull: false },
  onDelete: "CASCADE", // delete a poll -> its options get deleted automatically too
});
Option.belongsTo(Poll, { foreignKey: "pollId" });

// Same idea one level down: a vote can't exist without pointing at a real option.
Option.hasMany(Vote, {
  foreignKey: { name: "optionId", allowNull: false },
  onDelete: "CASCADE", // delete an option -> its votes go with it
});
Vote.belongsTo(Option, { foreignKey: "optionId" });

// Routes import everything through this file: require("../models")
module.exports = { db, Poll, Option, Vote };
