"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.removeColumn("permissions", "roleId");
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.addColumn("permissions", "roleId", {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "roles",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  }
};
