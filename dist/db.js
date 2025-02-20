"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Загружаем переменные окружения из файла .env
dotenv_1.default.config();
const config = {
    user: process.env.USER_PG,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    database: process.env.DATABASE,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.CA_CERT,
    },
};
const pool = new pg_1.Pool(config);
exports.default = pool;
