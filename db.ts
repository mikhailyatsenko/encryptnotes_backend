import { Pool } from "pg";
import dotenv from "dotenv";

// Загружаем переменные окружения из файла .env
dotenv.config();

const config = {
  user: process.env.USER_PG,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: parseInt(process.env.PORT!), 
  database: process.env.DATABASE,
  ssl: {
    rejectUnauthorized: true,
    ca: process.env.CA_CERT,
  },
};

const pool = new Pool(config);

export default pool;
