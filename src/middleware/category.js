const Category = require("../models/Category");

const addCategoryValidation = async(req, res, next)=>{
    try {
        req.body.name=req.body.name.toLowerCase()
        const {name} = req.body;
        if(!name) return res.status(400).json({message: "El nombre es requerido"})
        const categoryFound = await Category.findOne({name})
        if(categoryFound) {
            return res.status(400).json({message: "La categoría ya existe"})
        }
        next();
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports={
    addCategoryValidation,

}