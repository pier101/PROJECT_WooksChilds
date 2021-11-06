//시퀄라이즈  기본 연결 

const Sequelize = require("sequelize");     //시퀄라이즈 
const env = process.env.NODE_ENV || "development";          
const config = require("../../config/config.json")[env];  //db연결



const Notice = require("./notice");



const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,

    // process.env.MYSQL_DB,
    // process.env.MYSQL_USER,
    // process.env.MYSQL_PASS,
    // {
    //     host: process.env.MYSQL_URL,
    //     dialect: "mysql",
    //     timezone: "+09:00", // DB에 저장할 때 시간 설정
    //     dialectOptions: {
    //         timezone: "+09:00", // DB에서 가져올 때 시간 설정
    //     },
    //     define: {
    //         timestamps: false,
    //         supportBigNumbers: true,
    //     },
    // }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Notice = Notice;

Notice.init(sequelize);

Notice.associate(db);


module.exports = db;
