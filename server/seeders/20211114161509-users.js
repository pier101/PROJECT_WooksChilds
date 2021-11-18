'use strict';

const bcrypt = require("bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let datas = [];

    const hash = await bcrypt.hash("1234", 12);

    let obj = {
        userId: "dongwook12",
        userPwd: hash,
        userName: "김동욱",
        userTel: "010-1234-4567",
        userMail: "onedayclasstest@gmail.com",
        userAddr: "경기도 수원시",
        userImg: "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927",
        role: "artist",
        provider: "local"
    };
    datas.push(obj);

    const hash2 = await bcrypt.hash("1234", 12);
    let obj2 = {
        userId: "haemin12",
        userPwd: hash2,
        userName: "박해민",
        userTel: "010-4567-4567",
        userMail: "bhm@naver.com",
        userAddr: "서울시 강동구 천호 어딘가 쉐어하우스",
        userImg: "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927",
        role: "user",
        provider: "local"
    };
    datas.push(obj2);

    const hash3 = await bcrypt.hash("1234", 12);
    let obj3 = {
        userId: "soon12",
        userPwd: hash3,
        userName: "임철순",
        userTel: "010-9874-6541",
        userMail: "lcs@naver.com",
        userAddr: "서울시 강동구 천호 어딘가",
        userImg: "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927",
        role: "user",
        provider: "local"
    };
    datas.push(obj3);

    const hash4 = await bcrypt.hash("1234", 12);
    let obj4 = {
        userId: "rara12",
        userPwd: hash4,
        userName: "장아라",
        userTel: "010-4561-2876",
        userMail: "kakao@naver.com",
        userAddr: "서울시 강남구 서초동",
        userImg: "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927",
        role: "user",
        provider: "local"
    };
    datas.push(obj4);


    return queryInterface.bulkInsert("users", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkDelete("users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
