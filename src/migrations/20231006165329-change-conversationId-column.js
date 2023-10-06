'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      
      await queryInterface.changeColumn('Participants', 'ConversationId', {
        onDelete: 'CASCADE',
      })
    } catch (error) {
      console.log(error)
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Participants', 'ConversationId', {
      onDelete: 'CASCADE',
    })
  }
};
