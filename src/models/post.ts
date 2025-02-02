"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
interface postAttributes {
  id: number;
  uuid: string;
  userUuid: string;
  body: string;
}

export class Post extends Model<postAttributes> implements postAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  uuid!: string;
  userUuid!: string;
  body!: string;

  static associate(models: any) {
    // define association here

    this.belongsTo(models.User, { foreignKey: "userUuid", as: "user" });
  }

  toJSON() {
    return { ...this.get(), id: undefined, userId: undefined };
  }

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        uuid: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userUuid: {
          type: DataTypes.STRING,
          allowNull: false
        },
        body: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "posts",
        modelName: "Post"
      }
    );
  }
}

export default Post;
