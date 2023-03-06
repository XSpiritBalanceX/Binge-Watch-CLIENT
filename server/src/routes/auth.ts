import * as express from "express";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import authController from "@controllers/authController";

const authRouter = express.Router();

authRouter.post("/registration", authController.registration);
authRouter.post("/login", authController.login);
authRouter.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("http://localhost:3000/");
  });
});
authRouter.post(
  "/profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  function (req: Request, res: Response) {
    res.status(200).json({ message: req.user });
  }
);
export default authRouter;
