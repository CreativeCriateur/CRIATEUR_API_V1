"use strict";

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
        type: DataTypes.STRING,
        unique: true,
        index: true
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
        type: DataTypes.STRING
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
        type: DataTypes.BOOLEAN
      },
      deleteReason: {
        type: DataTypes.STRING
      },
      deletedAt: {
        type: DataTypes.DATE
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
