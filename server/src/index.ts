require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT;

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
