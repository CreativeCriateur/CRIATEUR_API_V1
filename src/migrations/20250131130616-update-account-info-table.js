"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.removeColumn("AccountInfos", "email");
    await queryInterface.removeColumn("AccountInfos", "password");
    await queryInterface.removeColumn("AccountInfos", "confirmPassword");
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.addColumn("AccountInfos", "confirmPassword", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("AccountInfos", "password", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("AccountInfos", "email", {
      type: DataTypes.STRING
    });
  }
};
