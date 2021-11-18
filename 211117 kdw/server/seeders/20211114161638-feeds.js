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
    feedContent : "이번 신곡 대박💜",
    feedCreated : Sequelize.literal("current_timestamp"),
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
