const express = require("express");
const { createCart, getCarts } = require("../controllers/cart");
const { decodeToken } = require("../middleware/auth");
const router = express.Router();

router.post("/createCart", decodeToken, createCart)
router.get("/getCarts",decodeToken , getCarts)


module.exports=router;