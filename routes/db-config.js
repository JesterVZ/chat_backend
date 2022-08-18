import myqSql from "mysql"
import dotenv from "dotenv"
dotenv.config();
const db = myqSql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
});

export default db;