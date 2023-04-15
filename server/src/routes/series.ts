import * as express from "express";
import seriesController from "@controllers/seriesController";

const seriesRouter = express.Router();

seriesRouter.get("/", seriesController.allSeries);
seriesRouter.get("/mainseries", seriesController.mainSeries);
seriesRouter.get("/:id", seriesController.oneSeries);

export default seriesRouter;
