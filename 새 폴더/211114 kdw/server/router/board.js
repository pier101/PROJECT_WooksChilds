const express = require("express");
const router = express.Router();
const controller = require("../controller");
const app = express();

router.post("/add/board", controller.add.board);

router.post("/get/board", controller.get.board);

router.get("/get/board_cnt", controller.get.board_cnt);

router.post('/get/board_data', controller.get.board_data);

module.exports = router;
