const express = require("express");

const authMiddleware = require("../../middleware/check-auth.js");
const controller = require("./userController.js");

const router = express.Router();

router.get("/:id" ,authMiddleware, controller.info);

router.put("/update/:id", authMiddleware , controller.update);

router.put("/changepass/:id", authMiddleware , controller.change);

router.put("/add/:id",authMiddleware, controller.addContact);

router.get("/contact/:id", authMiddleware, controller.getContact);

router.put("/delete/:id",authMiddleware, controller.deleteContact);

module.exports = router;
