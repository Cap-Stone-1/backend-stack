const { DataTypes } = require("sequelize");
const db = require("./db");

// Sequelize automatically adds id, createdAt, and updatedAt to every model below,
// so we only declare the columns that are actually specific to a Poll.
const Poll = db.define("Poll", {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // every poll needs a title
  },
  description: {
    type: DataTypes.TEXT,
  },
});

module.exports = Poll;
