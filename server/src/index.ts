import "module-alias/register";
import * as dotenv from "dotenv";
import express, { Express } from "express";
import sequelize from "@dataBase/db";
import cors from "cors";
import router from "./routes/index";
import errorHandlingMiddleware from "@middleware";
import initPassportAndSession from "./passportStrategy";

dotenv.config();

const PORT = 5000 || process.env.PORT;

const app: Express = express();

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);

initPassportAndSession(app);

app.use(express.json());
app.use("/api", router);
app.use(errorHandlingMiddleware);

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
