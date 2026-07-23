// Load variables from .env into process.env (must happen before we read DATABASE_URL below)
require("dotenv").config();
const { Sequelize } = require("sequelize");

// One shared connection, used by every model.
// Reads from .env locally; in production this same code just points at Neon instead —
// no code change needed, only the DATABASE_URL value changes.
const db = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // don't print every SQL query to the console
});

module.exports = db;
