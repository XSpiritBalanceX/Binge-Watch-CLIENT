import * as express from "express";
import passport from "passport";
import { Request, Response } from "express";
const authRouter = express.Router();
import authController from "../controllers/authController";

authRouter.post("/registration", authController.registration);
authRouter.post("/login", authController.login);
authRouter.get("/logout", (req: Request, res: Response) => {
  //req.logout();
  res.redirect("http://localhost:3000/");
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
