"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface accountInfoAttributes {
  id: number;
  uuid: string;
  userUuid: string;
  phoneNumber: string;
  userName: string;
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
  userUuid!: string;
  phoneNumber!: string;
  userName!: string;
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
    this.belongsTo(models.User, {
      foreignKey: "userUuid", // Specifies the foreign key in AccountInfos pointing to User
      targetKey: "uuid" // Refers to the uuid column in User
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
        userUuid: {
          type: DataTypes.STRING,
          allowNull: false
        },
        userName: {
          type: DataTypes.STRING
        },
        phoneNumber: {
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
        deleteReason: {
          type: DataTypes.STRING
        },
        deletedAt: {
          type: DataTypes.DATE
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
