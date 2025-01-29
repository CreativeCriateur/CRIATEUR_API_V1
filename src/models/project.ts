"use strict";
import { Model } from "sequelize";

interface projectAttributes {
  id: number;
  uuid: string;
  title: string;
  status: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Project extends Model<projectAttributes> implements projectAttributes {
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
  }
  Project.init(
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
  return Project;
};
