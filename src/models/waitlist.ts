"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import { BusinessType } from "../utils/types";

interface waitListAttributes {
  id: number;
  uuid: string;
  fullName: string;
  email: string;
  businessType: string;
  title: string;
  isDeleted: boolean;
  deletedAt: Date;
  deleteReason: string;
}

export class WaitList
  extends Model<waitListAttributes>
  implements waitListAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
  id!: number;
  uuid!: string;
  fullName!: string;
  email!: string;
  businessType!: string;
  title!: string;
  isDeleted!: boolean;
  deletedAt!: Date;
  deleteReason!: string;

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
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false
        },
        businessType: {
          type: DataTypes.ENUM(...Object.values(BusinessType))
        },
        title: {
          type: DataTypes.STRING
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
        tableName: "waitLists",
        modelName: "WaitList"
      }
    );
  }
}

export default WaitList;
