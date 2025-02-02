"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";

interface userRoleAttributes {
  userId: string;
  roleId: string;
}
class UserRole extends Model<userRoleAttributes> implements userRoleAttributes {
  userId!: string;
  roleId!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  static associate(models: any) {
    // define association here
  }

  static initModel(sequelize: Sequelize) {
    this.init(
      {
        userId: {
          type: DataTypes.STRING,
          autoIncrement: false,
          primaryKey: true
        },
        roleId: {
          type: DataTypes.STRING,
          autoIncrement: false,
          primaryKey: true
        }
      },
      {
        sequelize,
        tableName: "userRoles",
        modelName: "UserRole"
      }
    );
  }
}
