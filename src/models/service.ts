"use strict";
import { Model } from "sequelize";
module.exports = (sequelize: any, DataTypes: any) => {
  interface serviceAttributes {
    id: number;
    uuid: string;
    name: string;
    description: string;
    price: number;
  }
  class Service extends Model<serviceAttributes> implements serviceAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    uuid!: string;
    name!: string;
    description!: string;
    price!: number;
    static associate(models: any) {
      // define association here
    }
  }
  Service.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: "services",
      modelName: "Service"
    }
  );
  return Service;
};
