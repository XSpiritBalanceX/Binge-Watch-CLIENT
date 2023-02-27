import { UserModel } from "../dataBase/descriptionDB";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import ApiError from "../error/ApiError";

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return next(ApiError.badRequest("All data not filled"));
      }
      const candidate = await UserModel.findOne({ where: { email } });
      const candidateName = await UserModel.findOne({ where: { username } });
      if (candidate) {
        return next(ApiError.badRequest("This user already exists"));
      }
      if (candidateName) {
        return next(ApiError.badRequest("This name already exists"));
      }
      const hashPassword: string = await bcrypt.hash(password, 5);
      await UserModel.create({
        username,
        email,
        password: hashPassword,
      });
      return res.json({ message: "You have successfully registration!" });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }
}

export default new AuthController();
