import * as express from "express";
const router = express.Router();
import authRouter from "./auth";

router.use("/users", authRouter);

export default router;
