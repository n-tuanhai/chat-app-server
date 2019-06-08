const express = require("express");

const authMiddleware = require("../../middleware/check-auth.js");
const controller = require("./userController.js");

const router = express.Router();

router.put("/update/:id", authMiddleware , controller.update);

router.put("/changepass/:id", authMiddleware , controller.change);


module.exports = router;
