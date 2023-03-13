import * as dotenv from "dotenv";
import passport from "passport";
import { Express } from "express";
import JWT from "passport-jwt";
import session from "express-session";
import { UserModel } from "@dataBase/descriptionDB";

dotenv.config();

const JWTStrategy = JWT.Strategy;
const ExtractJWT = JWT.ExtractJwt;

export default function initPassportAndSession(app: Express) {
  app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

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
}
