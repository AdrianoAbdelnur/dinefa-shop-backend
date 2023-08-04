const Product = require("../models/Product");

const addProductValidation = async(req, res, next)=>{
    try {
        const {name, description, category, price, brand, model} = req.body;
        if(!name || !description || !category || !price || !brand || !model) return res.status(400).json({message: "Nombre, marca, modelo, categoría, descripcion y precio son requerido"})
        const productFound = await Product.findOne({name},{brand},{model})
        if(productFound) {
            return res.status(400).json({message: "Ya existe un producto con ese nombre, marca y modelo"})
        }
        next();
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    }

module.exports= {
    addProductValidation
}