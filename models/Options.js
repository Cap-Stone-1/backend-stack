const { DataTypes } = require("sequelize");
const db = require("../db");

const Option = db.define("Option", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Option;
