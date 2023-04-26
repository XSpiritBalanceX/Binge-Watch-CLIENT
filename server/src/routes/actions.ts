import * as express from "express";
import actionsController from "@controllers/actionsController";

const actionsRouter = express.Router();

actionsRouter.post("/watched", actionsController.addWatchedSeries);
actionsRouter.post("/desired", actionsController.addDesiredSeries);

export default actionsRouter;
