import { Request, Response, NextFunction } from "express";
import { Catalog } from "@dataBase/descriptionDB";
import ApiError from "@error";

class SeriesController {
  async allSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const genre: string = req.query.genre as string;
      const allSeries = await Catalog.findAll();
      if (genre === "сериалы") {
        return res.json(allSeries);
      } else {
        const retSeries: object[] = [];
        allSeries.forEach((el) => {
          if (el.genre.includes(genre)) {
            retSeries.push(el);
          }
        });
        return res.json(retSeries);
      }
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
  async oneSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id as string;
      const oneSeries = await Catalog.findAll({ where: { id } });
      return res.json(oneSeries);
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
}

export default new SeriesController();
