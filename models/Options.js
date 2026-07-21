const { DataTypes } = require("sequelize")
const db = require("../db")

const Options = db.define("Options", {
    text: {
        type: DataTypes.STRING, 
        allowNull: false
    }
})

module.exports = Options