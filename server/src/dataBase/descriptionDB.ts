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

export { UserModel };
