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
    await queryInterface.removeColumn("userRoles", "userId");
    await queryInterface.removeColumn("userRoles", "roleId");
    await queryInterface.addColumn("userRoles", "userId", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id"
      },
      onDelete: "CASCADE"
    });
    await queryInterface.addColumn("userRoles", "roleId", {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id"
      },
      onDelete: "CASCADE"
    });

    await queryInterface.addConstraint("userRoles", {
      fields: ["userId", "roleId"],
      type: "unique",
      name: "unique_user_role" // Ensures a user can have a role only once
    });
  },

  async down(queryInterface, DataTypes) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("userRoles");
  }
};
