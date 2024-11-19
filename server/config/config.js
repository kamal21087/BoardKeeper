import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get the directory name of the current module (ESM equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the .env file
dotenv.config({ path: resolve(__dirname, '../../.env') }); // Adjust the path to the root .env file

console.log('Database Name:', process.env.DB_NAME); // Should log 'kanban_db'

export default {
  development: {
    username: process.env.DB_USERNAME, // kamal
    password: process.env.DB_PASSWORD, // your_secure_password
    database: process.env.DB_NAME,     // kanban_db
    host: process.env.DB_HOST,         // localhost
    port: process.env.DB_PORT,         // 5432
    dialect: 'postgres',               // Using PostgreSQL
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`, // kanban_db_test
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_prod`, // kanban_db_prod
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  }
};
