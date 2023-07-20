const express = require("express");
const { addCategory, getAllCategories } = require("../controllers/category");
const { addCategoryValidation } = require("../middleware/category");
const router = express.Router();

router.post("/addCategory",addCategoryValidation, addCategory)
router.get("/getAllCategories", getAllCategories)


module.exports=router;