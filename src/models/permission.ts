"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface permissionAttributes {
  id: number;
  resourceId: number;
  name: string;
}
class Permission
  extends Model<permissionAttributes>
  implements permissionAttributes
{
  id!: number;
  resourceId!: number;
  name!: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }

  static initModel(sequelize: Sequelize) {
    Permission.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        resourceId: {
          type: DataTypes.INTEGER
        },
        name: { type: DataTypes.STRING }
      },
      {
        sequelize,
        tableName: "permissions",
        modelName: "Permission"
      }
    );
  }
}

export default Permission;
