import { Request, Response, NextFunction } from "express";
import { UserModel, Catalog } from "@dataBase/descriptionDB";
import ApiError from "@error";

type DataFromUser = {
  email: string;
  idseries: string;
  numberseason: number;
};

class ActionsController {
  async addWatchedSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, idseries, numberseason }: DataFromUser = req.body;
      if (!email || !idseries || !numberseason) {
        return next(ApiError.badRequest("All data not filled"));
      }
      const user = await UserModel.findOne({ where: { email } });
      const series = await Catalog.findOne({ where: { id: idseries } });
      await user.addBwseries(series, {
        through: {
          viewdseries: true,
          desiredseries: false,
          numberofseason: numberseason,
        },
      });
      return res.json({ message: "Successfully added" });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }

  async addDesiredSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, idseries }: DataFromUser = req.body;
      if (!email || !idseries) {
        return next(ApiError.badRequest("All data not filled"));
      }
      const user = await UserModel.findOne({ where: { email } });
      const series = await Catalog.findOne({ where: { id: idseries } });
      await user.addBwseries(series, {
        through: {
          viewdseries: false,
          desiredseries: true,
          numberofseason: 0,
        },
      });
      return res.json({ message: "Successfully added" });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }

  async getUserSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const username: string = req.query.username as string;
      const userSeries = await UserModel.findOne({
        where: { username },
        include: Catalog,
        attributes: ["id"],
      });
      return res.json({ userSeries });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }

  async removeSeries(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, idseries }: DataFromUser = req.body;
      if (!email || !idseries) {
        return next(ApiError.badRequest("All data not filled"));
      }
      const user = await UserModel.findOne({ where: { email } });
      const series = await Catalog.findOne({ where: { id: idseries } });
      await user.removeBwseries(series);
      return res.json({ message: "Successfully removed" });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
}

export default new ActionsController();
