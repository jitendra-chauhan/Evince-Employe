const express = require("express");

const requestHandler = require("../middlewares/requestHandler");
const create = require("../controllers/create");
const router = express.Router();

router.post("/create", requestHandler(create));

module.exports = router;
