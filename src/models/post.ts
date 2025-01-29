"use strict";
import { Model } from "sequelize";

interface postAttributes {
  id: number;
  uuid: string;
  userId: number;
  body: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<postAttributes> implements postAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    uuid!: string;
    userId!: number;
    body!: string;

    static associate(models: any) {
      // define association here

      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Post.init(
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
      userId: {
        type: DataTypes.INTEGER,
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
  return Post;
};
