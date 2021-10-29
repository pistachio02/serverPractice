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

    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/AlMarinaAbuDhabi.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/AtNightSeoul1.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/AtNightSeoul2.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/BurjAlArabDubai1.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/BurjAlArabDubai2.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/BurjKhalifaDubai.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/CornicheBeachAbuDhabi.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/LotteWorldTowerSeoul.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/NamsanTowerSeoul.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/SheikhZayedGrandMosqueAbuDhabi.jpg',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }], {}),
    // await queryInterface.bulkInsert('Images', [{
    //   image: 'https://touchimg.s3.ap-northeast-2.amazonaws.com/%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%8B%E1%85%AE%E1%86%B7%E1%84%8D%E1%85%A1%E1%86%AF.gif',
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
