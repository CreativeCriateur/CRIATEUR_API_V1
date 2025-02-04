"use strict";

import { Model, DataTypes, Sequelize } from "sequelize";

interface serviceAttributes {
  id: number;
  name: string;
  description: string;
  pricing: string;
  isDeleted: boolean;
  deleteReason: string;
  deletedAt: Date;
}
export class Service
  extends Model<serviceAttributes>
  implements serviceAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  name!: string;
  description!: string;
  pricing!: string;
  isDeleted!: boolean;
  deleteReason!: string;
  deletedAt!: Date;

  static associate(models: any) {
    // define association here
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
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT
        },
        pricing: {
          type: DataTypes.STRING,
          allowNull: false
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        deletedAt: {
          type: DataTypes.DATE
        },
        deleteReason: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize,
        tableName: "services",
        modelName: "Service"
      }
    );
  }
}

export default Service;
