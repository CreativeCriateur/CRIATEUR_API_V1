"use strict";
const { genderType, MaritalStatus } = require("../../dist/utils/types");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    // await queryInterface.renameColumn("users", "fullName", "name");
    await queryInterface.removeColumn("users", "salutation");
    await queryInterface.removeColumn("users", "firstName");
    await queryInterface.removeColumn("users", "lastName");
    await queryInterface.removeColumn("users", "primaryPhone");
    await queryInterface.removeColumn("users", "secondaryPhone");
    await queryInterface.removeColumn("users", "address");
    await queryInterface.removeColumn("users", "gender");
    await queryInterface.removeColumn("users", "country");
    await queryInterface.removeColumn("users", "maritalStatus");

    await queryInterface.addColumn("users", "confirmPassword", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("users", "otpExpiry", {
      type: DataTypes.DATE
    });
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("users", "otpExpiry");
    await queryInterface.removeColumn("users", "confirmPassword");
    await queryInterface.addColumn("users", "maritalStatus", {
      type: DataTypes.ENUM(...Object.values(MaritalStatus))
    });
    await queryInterface.addColumn("users", "country", {
      type: DataTypes.STRING,
      defaultValue: "NG"
    });
    await queryInterface.addColumn("users", "gender", {
      type: DataTypes.ENUM(...Object.values(genderType))
    });
    await queryInterface.addColumn("users", "address", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("users", "secondaryPhone", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("users", "primaryPhone", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("users", "lastName", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("users", "firstName", {
      type: DataTypes.STRING
    });
    await queryInterface.addColumn("users", "salutation", {
      type: DataTypes.STRING
    });
  }
};
