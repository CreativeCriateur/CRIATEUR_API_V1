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
    this.belongsTo(models.Resource, { foreignKey: "resourceId" });
    this.belongsToMany(models.Role, {
      through: "rolePermissions",
      foreignKey: "permissionId",
      onDelete: "CASCADE"
    });
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
        name: {
          type: DataTypes.STRING,
          unique: true
        },
        resourceId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "resources",
            key: "id"
          }
        }
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
