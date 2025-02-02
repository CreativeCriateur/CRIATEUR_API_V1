"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn("permissions", "roleId", {
      type: DataTypes.INTEGER, // Assuming roleId is an integer, adjust as needed
      allowNull: true, // You can set this to false if roleId is required
      references: {
        model: "roles", // Referring to the 'roles' table
        key: "id" // The column in the roles table that the foreign key will reference
      },
      onDelete: "CASCADE", // Ensures permissions are deleted if the associated role is deleted
      onUpdate: "CASCADE" // Updates the roleId in permissions if the associated role is updated
    });

    // If you want to set existing records to a default roleId after this:
    await queryInterface.sequelize.query(
      'UPDATE "permissions" SET "roleId" = 1 WHERE "roleId" IS NULL' // Replace with your default roleId
    );
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn("permissions", "roleId");
  }
};
