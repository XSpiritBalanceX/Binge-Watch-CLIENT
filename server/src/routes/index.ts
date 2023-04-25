import * as express from "express";
import authRouter from "./auth";
import seriesRouter from "./series";
import actionsRouter from "./actions";

const router = express.Router();

router.use("/users", authRouter);
router.use("/series", seriesRouter);
router.use("/actions", actionsRouter);

export default router;
