"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface userAttributes {
  id: number;
  uuid: string;
  email: string;
  password: string;
  confirmPassword: string;
  isActive: boolean;
  isNewUser: boolean;
  isDeleted: boolean;
  deletedAt: Date;
  deleteReason: string;
  appleId: string;
  googleId: string;
  facebookId: string;
  otp: string;
  otpExpiry: Date;
  imageUrl: string;
  registrationToken: string;
}

export class User extends Model<userAttributes> implements userAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  id!: number;
  uuid!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  isActive!: boolean;
  isNewUser!: boolean;
  isDeleted!: boolean;
  deletedAt!: Date;
  deleteReason!: string;
  appleId!: string;
  googleId!: string;
  facebookId!: string;
  otp!: string;
  otpExpiry!: Date;
  imageUrl!: string;
  registrationToken!: string;

  static associate(models: any) {
    // define association here
    this.hasMany(models.Post, { foreignKey: "userId", as: "posts" });
    this.hasMany(models.Booking, { foreignKey: "userId", as: "booking" });
    this.hasMany(models.AccountInfo, {
      foreignKey: "userId",
      as: "accountInfo"
    });
    this.belongsToMany(models.Project, {
      through: "ProjectAssignments"
    });
  }

  toJSON() {
    return { ...this.get(), id: undefined, userId: undefined };
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
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        confirmPassword: {
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
        },
        isActive: {
          type: DataTypes.BOOLEAN
        },
        isNewUser: {
          type: DataTypes.BOOLEAN
        },
        appleId: {
          type: DataTypes.STRING
        },
        googleId: {
          type: DataTypes.STRING
        },
        facebookId: {
          type: DataTypes.STRING
        },
        otp: {
          type: DataTypes.STRING
        },
        otpExpiry: {
          type: DataTypes.DATE
        },
        imageUrl: {
          type: DataTypes.STRING
        },
        registrationToken: {
          type: DataTypes.STRING,
          unique: true
        }
      },
      {
        sequelize,
        tableName: "users",
        modelName: "User"
      }
    );
  }
}

export default User;
