import { Pool } from "pg";
import dotenv from "dotenv";

// Загружаем переменные окружения из файла .env
dotenv.config();

const pool = new Pool({
  user: process.env.USER_PG,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.PORT || "5432"), 
  database: process.env.DATABASE,
});

export default pool;
