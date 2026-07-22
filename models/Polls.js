const { DataTypes } = require("sequelize")
const db = require("../db")

const Poll = db.define("Polls", {
    title: {
        type: DataTypes.STRING,
        allowNull: false

    },
    description: {
        type: DataTypes.STRING
    }
})

module.exports = Poll