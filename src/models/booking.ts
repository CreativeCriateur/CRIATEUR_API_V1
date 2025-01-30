"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../models";
interface bookingAttributes {
  id: number;
  uuid: string;
  userId: number;
  serviceId: number;
  bookingDate: Date;
  status: string;
}
export class Booking
  extends Model<bookingAttributes>
  implements bookingAttributes
{
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
    this.belongsTo(models.Service, {
      foreignKey: "serviceId",
      as: "service"
    });
    this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  }
  id!: number;
  uuid!: string;
  serviceId!: number;
  userId!: number;
  bookingDate!: Date;
  status!: string;

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
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        serviceId: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        bookingDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: "bookings",
        modelName: "Booking"
      }
    );
  }
}

export default Booking;
