import { Request, Response, NextFunction } from "express";
import { Catalog } from "@dataBase/descriptionDB";
import ApiError from "@error";

class SeriesController {
  async getAllSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const allSeries = await Catalog.findAll();
      return res.json(allSeries);
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
  async getOneSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.query.id as string;
      const oneSeries = await Catalog.findAll({ where: { id } });
      return res.json(oneSeries);
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
}

export default new SeriesController();
