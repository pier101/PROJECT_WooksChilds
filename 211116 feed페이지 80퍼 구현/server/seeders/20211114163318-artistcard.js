'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    
    let obj1={
      artistCardNum: 1,
      artistCardImg: "https://cdn-contents.weverse.io/admin/xlx2048/jpg/1c9a49d6725c4cff94802adee73b3591992.jpg",
      artistName: "CL"
    }
    datas.push(obj1);
    return queryInterface.bulkInsert("artistCards", datas, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
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
