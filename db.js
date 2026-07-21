const { Sequelize } = require("sequelize")

// database instance
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

console.log("whatsup")
module.exports = db

db.authenticate().then(() => {
    console.log("Connected")
}).catch((error) => {
    console.log("not connected")
})