"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.removeColumn("roles", "permissions");
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.addColumn("roles", "permissions", {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    });
  }
};
