import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import sequelize from "./dataBase/db";
import cors from "cors";
import router from "./routes/index";
import errorHandlingMiddleware from "./middleware/errorHandlingMiddleware";
import passport from "passport";
import JWT from "passport-jwt";
import { UserModel } from "./dataBase/descriptionDB";
const JWTStrategy = JWT.Strategy;
const ExtractJWT = JWT.ExtractJwt;

const PORT = 5000 || process.env.PORT;

const app: Express = express();

app.use(passport.initialize());
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
    },
    async function (jwtToken, done) {
      const user = await UserModel.findOne({
        where: { email: jwtToken.email },
      });
      if (!user) {
        return done(null, false);
      }
      return done(undefined, user, jwtToken);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
  })
);
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
