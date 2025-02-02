"use strict";
const { BusinessType } = require("../../dist/utils/types");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("waitlists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.STRING,
        unique: true
      },
      fullName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
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
    await queryInterface.dropTable("waitlists");
  }
};
