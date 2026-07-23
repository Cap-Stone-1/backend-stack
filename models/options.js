const { DataTypes } = require("sequelize");
const db = require("./db");

const Option = db.define("Option", {
  text: {
    type: DataTypes.STRING,
    allowNull: false, // an option with no text isn't useful, so we require it
  },
  // pollId is NOT declared here on purpose — it gets added automatically by the
  // Poll.hasMany(Option) association in models/index.js.
});

module.exports = Option;
