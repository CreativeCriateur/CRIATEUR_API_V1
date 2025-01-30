"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import { paymentStatus, TransactionType } from "../utils/types";

interface paymentAttributes {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  userId: number;
  paymentType: string;
  amount: number;
  status: string;
}
export class Payment
  extends Model<paymentAttributes>
  implements paymentAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  id!: number;
  uuid!: string;
  paymentType!: string;
  firstName!: string;
  lastName!: string;
  userId!: number;
  amount!: number;
  status!: string;
  static associate(models: any) {
    // define association here
    this.belongsTo(models.User, { foreignKey: "userId", as: "users" });
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
        firstName: {
          type: DataTypes.STRING
        },
        lastName: {
          type: DataTypes.STRING
        },
        paymentType: {
          type: DataTypes.ENUM(...Object.values(TransactionType))
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        status: {
          type: DataTypes.ENUM(...Object.values(paymentStatus))
        },
        amount: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "payments",
        modelName: "Payment"
      }
    );
  }
}

export default Payment;
