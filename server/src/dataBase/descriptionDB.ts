import sequelize from "./db";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  literal,
} from "sequelize";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<string>;
  username: string;
  email: string;
  password: string;
}

interface CatalogModel
  extends Model<
    InferAttributes<CatalogModel>,
    InferCreationAttributes<CatalogModel>
  > {
  id: CreationOptional<number>;
  name: string;
  url: string;
  year: number;
  seasons: number;
  genre: string;
  description: string;
  dateofnewseason: string;
}

sequelize.beforeSync(async () => {
  await sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');
});

const UserModel = sequelize.define<UserModel>("bwusers", {
  id: {
    type: DataTypes.UUID,
    defaultValue: literal("gen_random_uuid()"),
    primaryKey: true,
  },
  username: { type: DataTypes.STRING, unique: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Catalog = sequelize.define<CatalogModel>("bwseries", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.TEXT },
  url: { type: DataTypes.TEXT },
  year: { type: DataTypes.INTEGER },
  seasons: { type: DataTypes.INTEGER },
  genre: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  dateofnewseason: { type: DataTypes.TEXT },
});

export { UserModel, Catalog };
