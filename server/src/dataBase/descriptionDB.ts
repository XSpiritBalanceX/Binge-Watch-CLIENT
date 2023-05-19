import sequelize from "./db";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  literal,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
} from "sequelize";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  addBwseries: BelongsToManyAddAssociationMixin<
    CatalogModel,
    CatalogModel["id"]
  >;
  removeBwseries: BelongsToManyRemoveAssociationMixin<
    CatalogModel,
    CatalogModel["id"]
  >;
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
  id: CreationOptional<string>;
  name: string;
  url: string;
  urlscreen: string;
  year: number;
  seasons: number;
  genre: string;
  description: string;
  dateofnewseason: string;
}

interface ListsUserModel
  extends Model<
    InferAttributes<ListsUserModel>,
    InferCreationAttributes<ListsUserModel>
  > {
  id: CreationOptional<string>;
  viewdseries: boolean;
  desiredseries: boolean;
  numberofseason: number;
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
  id: {
    type: DataTypes.UUID,
    defaultValue: literal("gen_random_uuid()"),
    primaryKey: true,
  },
  name: { type: DataTypes.TEXT },
  url: { type: DataTypes.TEXT },
  urlscreen: { type: DataTypes.TEXT },
  year: { type: DataTypes.INTEGER },
  seasons: { type: DataTypes.INTEGER },
  genre: { type: DataTypes.TEXT },
  description: { type: DataTypes.TEXT },
  dateofnewseason: { type: DataTypes.TEXT },
});

const ListsUser = sequelize.define<ListsUserModel>("bwlistsusers", {
  id: {
    type: DataTypes.UUID,
    defaultValue: literal("gen_random_uuid()"),
    primaryKey: true,
  },
  viewdseries: { type: DataTypes.BOOLEAN },
  desiredseries: { type: DataTypes.BOOLEAN },
  numberofseason: { type: DataTypes.INTEGER },
});

UserModel.belongsToMany(Catalog, {
  through: ListsUser,
});
Catalog.belongsToMany(UserModel, {
  through: ListsUser,
});

export { UserModel, Catalog, ListsUser };
