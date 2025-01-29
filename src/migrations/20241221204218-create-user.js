"use strict";

const { genderType, MaritalStatus } = require("../../dist/utils/types");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.STRING
      },
      salutation: {
        type: DataTypes.STRING
      },
      firstName: {
        type: DataTypes.STRING
      },
      lastName: {
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
      primaryPhone: {
        type: DataTypes.STRING
      },
      secondaryPhone: {
        type: DataTypes.STRING
      },
      address: {
        type: DataTypes.STRING
      },
      isDeleted: {
        type: DataTypes.BOOLEAN
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
      gender: {
        type: DataTypes.ENUM(...Object.values(genderType))
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
      country: {
        type: DataTypes.STRING,
        defaultValue: "NG"
      },
      imageUrl: {
        type: DataTypes.STRING
      },
      maritalStatus: {
        type: DataTypes.ENUM(...Object.values(MaritalStatus))
      },
      registrationToken: {
        type: DataTypes.STRING,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("users");
  }
};
