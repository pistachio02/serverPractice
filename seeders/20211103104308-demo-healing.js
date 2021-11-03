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

    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/1.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/1.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/2.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/2.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/3.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/3.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/4.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/4.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/5.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/5.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/6.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/6.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/7.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/7.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/8.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/8.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/9.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/9.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/10.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/10.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/11.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/11.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/12.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/12.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/13.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/13.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/14.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/14.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}),
    await queryInterface.bulkInsert('Healings', [{
      image: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/img/15.mp4',
      sound: 'https://touch-img-sound.s3.ap-northeast-2.amazonaws.com/sound/15.mp3',
      title: '테스트중',
      content: '테스트중',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
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
