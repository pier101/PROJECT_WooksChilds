const Sequelize = require("sequelize");

module.exports = class OrderGoods extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                orderGoodsNum: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true,
                },
                orderQty: {
                    type: Sequelize.INTEGER(45),
                    allowNull: false,
                },
                orderCreated: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
                //foriegn key로 못 받아오면 추가 db생성하기
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "OrderGoods",
                tableName: "OrderGoods",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }

    static associate(db) {
        //forienkey 여러개 가능?하면 추가하기
        db.OrderGoods.belongsTo(db.Goods, {
            foreignKey: "goodsNum",
            targetKey: "goodsNum",
        });
        db.OrderGoods.belongsTo(db.User, {
            foreignKey: "userId",
            targetKey: "userId",
        });
        // db.orderGoods.hasMany(db.orderGoodsDetail, {
        //     foreignKey: "orderGoodsNum",
        //     sourceKey: "orderGoodsNum",
        // });
    }
};
