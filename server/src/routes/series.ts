import * as express from "express";
import seriesController from "@controllers/seriesController";

const seriesRouter = express.Router();

seriesRouter.get("/", seriesController.allSeries);
seriesRouter.get("/:id", seriesController.oneSeries);

export default seriesRouter;
