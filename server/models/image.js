const Sequelize = require("sequelize");

module.exports = class Image extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                imageNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                src: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "Image",
                tableName: "image",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Image.belongsTo(db.Feed, {
            foreignKey: "feedNum",
            sourceKey: "feedNum",
        });
    }
};
