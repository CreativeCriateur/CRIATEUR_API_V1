"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("accountInfos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userUuid: {
        type: DataTypes.STRING,
        references: {
          model: "users", // The name of the Users table
          key: "uuid" // The column to reference in the Users table
        },
        onDelete: "CASCADE", // Action when the referenced user is deleted
        onUpdate: "CASCADE" // Action when the referenced user is updated
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
    await queryInterface.dropTable("accountInfos");
  }
};
