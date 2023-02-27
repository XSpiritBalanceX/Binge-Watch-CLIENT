import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import sequelize from "./dataBase/db";
import cors from "cors";
import router from "./routes/index";

const PORT = 5000 || process.env.PORT;

const app: Express = express();
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET, POST, PUT, DELETE",
  })
);
app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
