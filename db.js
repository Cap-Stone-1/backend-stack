const { Sequelize } = require("sequelize");

const db = new Sequelize("postgres://localhost:5432/polls");

console.log("whatsup")

db.authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.error(err);
  });
  
module.exports = db;
