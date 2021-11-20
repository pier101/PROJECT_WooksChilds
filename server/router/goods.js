
const express = require("express");
const WishList = require('../models/wishlist')
const Goods = require('../models/goods')
const ArtistCard = require('../models/artistcard')
const User = require('../models/user')
const router = express.Router();


//찜 목록 불러오기
router.get("/wishlist/:id", async (req, res) => {
    try { 
        const id = req.params.id
        console.log(id);
        const wishlist = await WishList.findAll({
            include:  [{ model: Goods}],
        where:{userId : id}})
        console.log(wishlist)
        return res.json(wishlist)
        //  return res.json(wishlist[0].Oclass.classTitle);
         for (let i = 0; i < wishlist.length; i++) {
             return res.json(wishlist[i]);
         }

    } catch (err) {
        console.error(err);
    }
});


//찜 추가 및 삭제
router.post("/:num/wishlist", async (req, res) => {
    try {
        const {id}= req.body
        const num = req.params.num
        // const goods = await Goods.findOne({
        //     where: { goodsNum: num },
        // });
        console.log(id)
        console.log(num)
        // console.log(goods.goodsNum); //
        const wish = await WishList.findOne({
            where: { goodsNum: num,userId: id },
        });

        if (wish) {
            await WishList.destroy({ where: { goodsNum: num,userId: id } });
        } else {
            await WishList.create({
                userId: id,
                goodsNum:num,
            });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});



module.exports = router;