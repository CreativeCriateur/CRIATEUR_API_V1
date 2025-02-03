"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

interface userAttributes {
  id: number;
  uuid: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageUrl: string;
  otp: string;
  otpExpiry: Date;
  registrationToken: string;
  isActive: boolean;
  isNewUser: boolean;
  googleId: string;
  isDeleted: boolean;
  deleteReason: string;
  deletedAt: Date;
}

export class User extends Model<userAttributes> implements userAttributes {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */

  id!: number;
  uuid!: string;
  fullName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
  imageUrl!: string;
  isActive!: boolean;
  isNewUser!: boolean;
  googleId!: string;
  isDeleted!: boolean;
  deleteReason!: string;
  deletedAt!: Date;
  otp!: string;
  otpExpiry!: Date;
  registrationToken!: string;

  static associate(models: any) {
    // define association here
    //this.hasMany(models.Post, { foreignKey: "userUuid", as: "post" });
    //this.hasMany(models.Booking, { foreignKey: "userUuid", as: "booking" });
    this.hasOne(models.AccountInfo, {
      foreignKey: "userUuid", // Specifies that AccountInfos references User via uuid
      sourceKey: "uuid", // Indicates the key in the User model
      as: "accountInfo"
    });
    // this.belongsToMany(models.Project, {
    //   through: "ProjectAssignments"
    // });
  }

  // toJSON() {
  //   return { ...this.get(), id: undefined, userUuid: undefined };
  // }

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
          allowNull: false,
          unique: true
        },
        fullName: {
          type: DataTypes.STRING
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
        imageUrl: {
          type: DataTypes.STRING
        },
        isActive: {
          type: DataTypes.BOOLEAN
        },
        isNewUser: {
          type: DataTypes.BOOLEAN
        },
        googleId: {
          type: DataTypes.STRING
        },
        otp: {
          type: DataTypes.STRING
        },
        otpExpiry: {
          type: DataTypes.DATE
        },
        registrationToken: {
          type: DataTypes.STRING,
          unique: true
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
        tableName: "users",
        modelName: "User"
      }
    );
  }
}

export default User;
