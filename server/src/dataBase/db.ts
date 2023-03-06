import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

export default new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    dialect: "postgres",
    host: process.env.PGHOST,
    port: 7845,
  }
);
