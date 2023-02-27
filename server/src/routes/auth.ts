import * as express from "express";
const authRouter = express.Router();
import authController from "../controllers/authController";

authRouter.post("/registration", authController.registration);

export default authRouter;
