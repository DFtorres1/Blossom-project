'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM('Alive', 'Dead', 'unknown'),
      },
      species: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM('Female', 'Male', 'Genderless', 'unknown'),
      },
      name: {
        type: Sequelize.STRING,
      },
      image_path: {
        type: Sequelize.STRING,
      },
      is_starred: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      origin: {
        type: Sequelize.JSON,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Characters');
  },
};
