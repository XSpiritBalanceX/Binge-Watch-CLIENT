import * as dotenv from "dotenv";
dotenv.config();
import express from "express";

const PORT = 5000 || process.env.PORT;

const app = express();

app.use(express.json());

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
