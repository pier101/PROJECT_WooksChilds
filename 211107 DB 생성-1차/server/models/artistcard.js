const Sequelize = require("sequelize");

module.exports = class ArtistCard extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                artistCardNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                artistCardImg: {
                    type: Sequelize.STRING(100),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "ArtistCard",
                tableName: "artistCards",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        db.ArtistCard.hasMany(db.Artist, {
            foreignKey: "artistCardNum",
            sourceKey: "artistCardNum",
        });

    }
};
