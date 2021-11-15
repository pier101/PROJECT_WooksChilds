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
  let datas = [];
  let feed1 ={
    feedNum : 1,
    feedContent : "프로필을 CL로 변경합니다💜",
    feedCreated : Sequelize.literal("current_timestamp"),
    artistId : "clclcl",
    artistName : "CL",
    userId : "dongwook12",
  }
  datas.push(feed1);
  
  return queryInterface.bulkInsert("feeds", datas, {});
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
