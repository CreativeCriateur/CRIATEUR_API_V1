"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface resourceAttributes {
  id: number;
  name: string;
  url: string;
}

class Resource extends Model<resourceAttributes> implements resourceAttributes {
  id!: number;
  name!: string;
  url!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  static associate(models: any) {
    // define association here
    this.hasMany(models.Permission, {
      foreignKey: "resourceId",
      onDelete: "CASCADE"
    });
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "resources",
        modelName: "Resource"
      }
    );
  }
}

export default Resource;
