"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface accountInfoAttributes {
  id: number;
  uuid: string;
  userId: number;
  phoneNumber: string;
  username: string;
  organization: string;
  position: string;
  address: string;
  isDeleted: boolean;
  deletedAt: Date;
  deleteReason: string;
}

export class AccountInfo
  extends Model<accountInfoAttributes>
  implements accountInfoAttributes
{
  id!: number;
  uuid!: string;
  userId!: number;
  phoneNumber!: string;
  username!: string;
  organization!: string;
  position!: string;
  address!: string;
  isActive!: boolean;
  isNewUser!: boolean;
  isDeleted!: boolean;
  deletedAt!: Date;
  deleteReason!: string;

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
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
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        phoneNumber: {
          type: DataTypes.STRING
        },
        username: {
          type: DataTypes.STRING
        },
        organization: {
          type: DataTypes.STRING
        },
        position: {
          type: DataTypes.STRING
        },
        address: {
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
        tableName: "accountInfos",
        modelName: "accountInfo"
      }
    );
  }
}

export default AccountInfo;
