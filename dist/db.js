"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "ibmcabhn",
    password: "4zpQOVvKSEDWBqgC49082LovkfI0lRfb",
    host: "mouse.db.elephantsql.com",
    port: 5432,
    database: "ibmcabhn",
});
exports.default = pool;
