import * as express from "express";
import actionsController from "@controllers/actionsController";

const actionsRouter = express.Router();

actionsRouter.post("/watched", actionsController.addWatchedSeries);

export default actionsRouter;
