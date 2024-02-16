import knex, { Knex } from "knex";
import dotenv from "dotenv";
dotenv.config();
const config: Knex.Config = {
    client: "sqlite3",
    connection: {
        filename: process.env.SQLITE_FILENAME || "./data.db",
    },
    useNullAsDefault: true,
};
const db: Knex = knex(config);
export default db;
