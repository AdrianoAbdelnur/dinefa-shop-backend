const express = require("express");
const { addProduct, getAllProducts } = require("../controllers/product");
const { addProductValidation } = require("../middleware/product");

const router = express.Router();

router.post("/addProduct",addProductValidation ,addProduct)
router.get("/getAllProducts", getAllProducts)


module.exports=router;