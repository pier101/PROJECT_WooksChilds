
const express = require("express");
const WishList = require('../models/wishlist')
const Goods = require('../models/goods')
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

    } catch (err) {
        console.error(err);
    }
});


//찜 추가 및 삭제
router.post("/:num/wishlist", async (req, res) => {
    try {
        const {id}= req.body
        const num = req.params.num
        console.log(id)
        console.log(num)
        // console.log(goods.goodsNum); //
        const wish = await WishList.findOne({
            where: { goodsNum: num,userId: id },
        })
        

        if (wish) {
            return await WishList.destroy({ where: { goodsNum: num,userId: id } })
            .then(data=>res.json(data))
            .catch(err=>console.error(err))
        } else if (!wish) {
            return await WishList.create({
                userId: id,
                goodsNum:num,
            })
            .then(data=>res.json(data))
            .catch(err=>console.error(err))
        }
    } catch (err) {
        console.error(err);
    }
});
router.post("/:num/wishlist/delete", async (req, res) => {
    try {
        const {id}= req.body
        const num = req.params.num
        console.log("위시삭제요청")
        console.log(id)
        console.log(num)
        await WishList.findOne({
            where: { goodsNum: num,userId: id },
        })
        
        await WishList.destroy({ where: { goodsNum: num,userId: id } })
        .then(data=>res.json(data))
        .catch(err=>console.error(err))
    } catch (err) {
        console.error(err);
    }
});

//굿즈 드갈시 찜여부 판단
router.get("/:num/wishlist/:id", async (req, res) => {
    try {
        const {num,id} = req.params
        // const goods = await Goods.findOne({
        //     where: { goodsNum: num },
        // });
        console.log(id)
        console.log(num)
        // console.log(goods.goodsNum); //
        await WishList.findOne({
            where: { goodsNum: num,userId: id },
        }).then(data=>res.json(data))
        
    } catch (err) {
        console.error(err);
    }
});



module.exports = router;