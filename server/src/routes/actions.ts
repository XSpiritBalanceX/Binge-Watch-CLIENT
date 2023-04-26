import * as express from "express";
import actionsController from "@controllers/actionsController";

const actionsRouter = express.Router();

actionsRouter.post("/watched", actionsController.addWatchedSeries);
actionsRouter.post("/desired", actionsController.addDesiredSeries);
actionsRouter.get("/", actionsController.getUserSeries);

export default actionsRouter;
