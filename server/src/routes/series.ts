import * as express from "express";
import seriesController from "@controllers/seriesController";

const seriesRouter = express.Router();

seriesRouter.get("/getall", seriesController.getAllSeries);
seriesRouter.get("/getone", seriesController.getOneSeries);

export default seriesRouter;
