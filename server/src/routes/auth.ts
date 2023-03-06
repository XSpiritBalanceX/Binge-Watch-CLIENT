import * as express from "express";
import passport from "passport";
import authController from "@controllers/authController";

const authRouter = express.Router();

authRouter.post("/registration", authController.registration);
authRouter.post("/login", authController.login);
authRouter.post(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  authController.auth
);
authRouter.get("/logout", authController.logoutApp);

export default authRouter;
