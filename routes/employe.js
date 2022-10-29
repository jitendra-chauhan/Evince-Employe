const express = require("express");

const requestHandler = require("../middlewares/requestHandler");
const create = require("../controllers/create");
const list = require("../controllers/list");
const update = require("../controllers/update");
const router = express.Router();

router.post("/create", requestHandler(create));
router.get("/list", requestHandler(list));
router.post("/update", requestHandler(update));

module.exports = router;
