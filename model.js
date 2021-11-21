const sequelize = require("./models").sequelize;

var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const now_date = moment().format("YYYY-MM-DD HH:mm:ss");

const {
  Board,
  Sequelize: { Op },
} = require("./models");
sequelize.query("SET NAMES utf8;");

module.exports = {
  add: {
    board: (body, callback) => {
      Board.create({
        title: body.title,
        contents: body.contents,
        date: now_date,
      })
        .then((data) => {
          callback(true);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
 
  get: {
    board: (body, callback) => {
      Board.findAll({
        limit: body.page * body.limit,
        offset: (body.page - 1) * body.limit,
        order: sequelize.literal("board_id DESC"),
      })
        .then((data) => {
          callback(data);
        })
        .catch((err) => {
          throw err;
        });
    },
    board_data : (body, callback) => {
      Board.findAll({
          where : { board_id : body.id }
      })
      .then(result => {
          callback(result);
      })
      .catch(err => {
          throw err;
      })
  },

    board_cnt: (callback) => {
      Board.count().then((result) => {
        callback(result);
      });
    },
  },

  /*
        getData : callback => {
            Teacher.findAll()
            .then( result => { callback(result) })
            .catch( err => { throw err })
        },

        addData : (body, callback) => {
            Teacher.create({
                name : body.data
            })
            .then( result => {
                callback(result)
            })
            .catch( err => {
                console.log(err)
                throw err;
            })
        },

        modifyData : (body, callback) => {
            Teacher.update({ name : body.modify.name }, {
                where : { id : body.modify.id }
            })
            .then( result => { callback(result) })
            .catch( err => { throw err })
        },

        deleteData : (body, callback) => {
            Teacher.destroy({
                where : { id : body.delete.id }
            })
            .then( callback(true) )
            .catch( err => { throw err })
        }
        */
};
