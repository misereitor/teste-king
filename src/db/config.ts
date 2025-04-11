import { Pool } from 'pg';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DATABASE_URL } =
  process.env;
const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
