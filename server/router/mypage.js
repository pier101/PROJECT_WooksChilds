const express = require("express");
const User = require('../models/user');
const Feed = require('../models/feed')
const router = express.Router();


router.get('/:id',async(req,res)=>{
    const id = req.params.id
    await User.findOne({where: {userId: id} }).then(data=>res.send(data))
})
router.get('/feed/:id',async(req,res)=>{
    const id = req.params.id
    await Feed.findAll({where: {userId : id}}).then(data=>res.send(data))
})

module.exports = router;