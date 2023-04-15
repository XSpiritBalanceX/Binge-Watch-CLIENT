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
  async mainSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const allSeries = await Catalog.findAll();
      const latestSeries = allSeries.slice(-10);
      const topTen: number[] = [21, 18, 11, 42, 22, 47, 41, 31, 15, 5];
      const topTenSeries = [];
      allSeries.forEach((el, index) => {
        if (topTen.includes(index)) {
          topTenSeries.push(el);
        }
      });
      return res.json({ latestSeries, topTenSeries });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
  async oneSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id as string;
      const oneSeries = await Catalog.findOne({ where: { id } });
      return res.json(oneSeries);
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
}

export default new SeriesController();
