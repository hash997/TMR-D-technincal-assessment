"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          password: "12345",
          role: "normal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Monica Geller",
          password: "54321",
          role: "normal",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete("Users", {});
  },
};
