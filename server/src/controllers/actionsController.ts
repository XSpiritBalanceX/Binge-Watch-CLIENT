import { Request, Response, NextFunction } from "express";
import { UserModel, Catalog } from "@dataBase/descriptionDB";
import ApiError from "@error";
import { QueryTypes } from "sequelize";
import sequelize from "@dataBase/db";

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
      const addedSeries = sequelize.query(
        `INSERT INTO "bwlistsusers" ("viewdseries", "desiredseries", "numberofseason", "bwuserId", "bwseryId", "createdAt", "updatedAt") VALUES (true, false, ${numberseason}, "${
          user.id
        }", "${series.id}", "${+new Date()}", "${+new Date()}");`
      );
      //await user.addSeries(series);
      return res.json({ message: addedSeries });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
}

export default new ActionsController();
