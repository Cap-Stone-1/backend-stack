const db = require("./db");
const Poll = require("./polls");
const Option = require("./options");
const Vote = require("./votes");

Poll.hasMany(Option, {
  foreignKey: { name: "pollId", allowNull: false },
  onDelete: "CASCADE",
});
Option.belongsTo(Poll, { foreignKey: "pollId" });

Option.hasMany(Vote, {
  foreignKey: { name: "optionId", allowNull: false },
  onDelete: "CASCADE",
});
Vote.belongsTo(Option, { foreignKey: "optionId" });

module.exports = { db, Poll, Option, Vote };
