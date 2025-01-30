"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface projectAttributes {
  id: number;
  uuid: string;
  title: string;
  status: string;
}

export class Project
  extends Model<projectAttributes>
  implements projectAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  uuid!: string;
  title!: string;
  status!: string;
  static associate(models: any) {
    // define association here
    this.belongsToMany(models.User, {
      through: "ProjectAssignments"
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
        uuid: {
          type: DataTypes.STRING,
          allowNull: false
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "projects",
        modelName: "Project"
      }
    );
  }
}

export default Project;
