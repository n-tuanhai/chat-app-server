const express = require("express");

const authMiddleware = require("../../middleware/check-auth.js");
const controller = require("./convController.js");

const router = express.Router();

router.get("/info", authMiddleware , controller.getInfo);

module.exports = router;
