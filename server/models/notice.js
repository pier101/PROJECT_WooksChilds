const Sequelize = require("sequelize");

module.exports = class Notice extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                noticeNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                
                noticeContent: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
               
               
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "notice",
                tableName: "notices",
                paranoid: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }

    static associate(db) {
    }
};
