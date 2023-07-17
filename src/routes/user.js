const express = require("express");
const { createUsersValidations, authUserValidations } = require("../middleware/user");
const { addUser, loginUser, getUserData, loginStatus } = require("../controllers/user");
const validate = require("../helpers/validate");
const { decodeToken } = require("../middleware/auth");
const router = express.Router();

router.post("/register",createUsersValidations, addUser)
router.post("/login", authUserValidations(), validate, loginUser)

router.get("/status", decodeToken, loginStatus);
router.get("/userData", decodeToken, getUserData)


module.exports=router;