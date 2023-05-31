const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ibmcabhn",
  password: "4zpQOVvKSEDWBqgC49082LovkfI0lRfb",
  host: "mouse.db.elephantsql.com",
  port: 5432,
  database: "ibmcabhn",
});

module.exports = pool;
