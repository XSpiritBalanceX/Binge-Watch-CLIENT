import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "@dataBase/descriptionDB";
import ApiError from "@error";

type DataUser = {
  username?: string;
  email: string;
  password: string;
};
const generateJwt = (id: number, email: string, username: string) => {
  return jwt.sign({ id, email, username }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class AuthController {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password }: DataUser = req.body;
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

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password }: DataUser = req.body;
      const user = await UserModel.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal("User is not found"));
      }
      const comparePassword: boolean = bcrypt.compareSync(
        password,
        user.password
      );
      if (!comparePassword) {
        return next(ApiError.internal("Wrong password entered"));
      }
      const token = generateJwt(user.id, user.email, user.username);
      return res.status(200).json({ token, message: "Successfully" });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }

  auth(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({ message: req.user });
    } catch (err) {
      return next(ApiError.internal("Something went wrong, please try again"));
    }
  }

  logoutApp(req: Request, res: Response, next: NextFunction) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("http://localhost:3000/");
    });
  }
}

export default new AuthController();
