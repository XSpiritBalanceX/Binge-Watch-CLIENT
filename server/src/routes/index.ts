import * as express from "express";
import authRouter from "./auth";
import seriesRouter from "./series";

const router = express.Router();

router.use("/users", authRouter);
router.use("/series", seriesRouter);

export default router;
