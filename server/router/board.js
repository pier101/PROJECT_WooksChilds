const express = require("express");
const router = express.Router();
const controller = require("../controller");
const app = express();
const Board = require('../models/board')

router.post("/add/board", controller.add.board);

router.post("/get/board", controller.get.board);

router.post("/delete/board", async (req, res) => {
    try {
        const {data} = req.body;
         await Board.destroy({
            where: { board_id:data },
        });
    } catch (err) {
        console.error(err);
    }
});

router.get("/get/board_cnt", controller.get.board_cnt);

router.post("board/:id/:boardnum/edit", async (req, res, next) => {
    try {
        const {data} = req.body;
        // let board = res.locals.user.board_id;
        let boardnumber = req.params.boardnumber;
        console.log(boardnumber);
        let { boardNumber } = req.body;

        const b = await Board.findAll({
            where: {  board_id:data },
        });
        // return res.json(b);
        if (typeof boardNumber == "object") {
            for (let i = 0; i < b.length; i++) {
                if (b[i].boardNumber == boardnumber) {
                    await Board.update(
                        {
                            boardContent: req.body.updateBoard[i],
                            updatedAt: Date.now(),
                        },
                        { where: { boardNum: boardnumber } }
                    );
                }
            }
        } else {
            for (let i = 0; i < b.length; i++) {
                if (b[i].boardNum == boardnumber) {
                    await Board.update(
                        {
                            boardContent: req.body.updateBoard,
                            updatedAt: Date.now(),
                        },
                        { where: { boardNum: boardnumber } }
                    );
                }
            }
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

    


router.post('/get/board_data', async(req,res)=>{
    const {data} = req.body;
    console.log(data)
    console.log('왔어')
    await Board.findOne({where:{board_id:data}}).then(data=>res.send(data))


});

module.exports = router;
