"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface roleAttributes {
  id: number;
  name: string;
}

class Role extends Model<roleAttributes> implements roleAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  name!: string;

  static associate(models: any) {
    // define association here
    this.belongsToMany(models.Permission, {
      through: "rolePermissions",
      foreignKey: "roleId",
      onDelete: "CASCADE"
    });
    this.belongsToMany(models.User, {
      through: "userRoles",
      foreignKey: "roleId",
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
          unique: true
        }
      },
      {
        sequelize,
        tableName: "roles",
        modelName: "Role"
      }
    );
  }
}

export default Role;
