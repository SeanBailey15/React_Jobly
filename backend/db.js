"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { PGPASSWORD, getDatabaseUri } = require("./config");

/** Convert numeric data types to Javascript floating point numbers */
var types = require("pg").types;
types.setTypeParser(1700, (val) => {
  return parseFloat(val);
});

let db;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
    password: PGPASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  db = new Client({
    connectionString: getDatabaseUri(),
    password: PGPASSWORD,
  });
}

db.connect();

module.exports = db;
