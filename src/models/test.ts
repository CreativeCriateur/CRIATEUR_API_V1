"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../models"; // Ensure the path is correct
interface testAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class Test extends Model<testAttributes> implements testAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  static associate(models: any) {
    // define association here
  }

  toJSON() {
    return { ...this.get(), id: undefined, password: undefined };
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
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "tests",
        modelName: "Test"
      }
    );
  }
}

export default Test;
