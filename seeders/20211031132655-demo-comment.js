'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    //  await queryInterface.bulkInsert('Comments', [{
    //   content: '댓글1',
    //   post_id: 1,
    //   user_id: 1,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {})

    // await queryInterface.bulkInsert('Comments', [{
    //   content: '댓글2',
    //   post_id: 2,
    //   user_id: 2,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {})

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
