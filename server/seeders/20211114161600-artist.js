'use strict';
const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];
    const hash = await bcrypt.hash("1234", 12);
    
    let obj = {
        artistId: "clclcl",
        artistPwd: hash,
        artistName: "CL",
        artistMail: "ygenter@gmail.com",
        artistCreated: Sequelize.literal("current_timestamp"),
    };
    datas.push(obj);

    return queryInterface.bulkInsert("artists", datas, {});
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
