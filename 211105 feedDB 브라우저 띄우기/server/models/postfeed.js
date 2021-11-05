const Sequelize = require("sequelize");

module.exports = class POSTFEED extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                feedNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                feedContent: {
                    type: Sequelize.STRING(45),
                    allowNull: true,
                },
                feedCreated: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: Sequelize.NOW,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "PostFeed",
                tableName: "postfeed",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        //유저 n:n
        //셀럽 1:n
        //댓글 n:1
    }
};
