"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rolePermissions", {
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.addConstraint("rolePermissions", {
      fields: ["roleId", "permissionId"],
      type: "unique",
      name: "unique_role_permission" // Ensures a role can have a permission only once
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rolePermissions");
  }
};
