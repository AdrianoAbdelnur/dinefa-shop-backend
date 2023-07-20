const Product = require("../models/Product");


const addProduct = async (req, res) => {
    try {
        const productToAdd = req.body; 
        const newProduct = new Product(productToAdd);
        await newProduct.save();
        res.status(200).json({ message: 'Producto creada con exito', newProduct })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}

const getAllProducts= async (req, res) => {
    try {
        const productsFound  = await Product.find( { isDeleted: false }).populate('category');
        if (productsFound.length === 0) return res.status(400).json({ message: 'lista de productos vacia' });
        return res.status(200).json({ message: 'Productos obtenidos de forma exitosa', products: productsFound })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message })
    }
}

module.exports= {
    addProduct,
    getAllProducts

}