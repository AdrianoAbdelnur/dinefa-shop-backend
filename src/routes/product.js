const express = require("express");
const { addProduct, getAllProducts, getProduct } = require("../controllers/product");
const { addProductValidation } = require("../middleware/product");

const router = express.Router();

router.post("/addProduct",addProductValidation ,addProduct)
router.get("/getAllProducts", getAllProducts)
router.get("/getProduct/:id", getProduct )


module.exports=router;