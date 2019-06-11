const express = require("express");

const authMiddleware = require("../../middleware/check-auth.js");
const controller = require("./authController.js");
const { check } = require("express-validator/check");

const router = express.Router();


router.post("/login", controller.login);

router.post("/register", check("email").isEmail(),
  check("password", "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  controller.register);


module.exports = router;
