const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", "..", ".env") });

module.exports = {
  development: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres"
  },
  test: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres"
  },
  production: {
    username: process.env.PGUSERNAME,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: "postgres"
  }
};
