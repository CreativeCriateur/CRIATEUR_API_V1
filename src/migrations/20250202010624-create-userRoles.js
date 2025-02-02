"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("userRoles", {
      userId: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true
      },
      roleId: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true
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
    await queryInterface.dropTable("userRoles");
  }
};
