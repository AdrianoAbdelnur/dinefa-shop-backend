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

const getProduct= async (req, res) => {
    try {
        const {id} = req.params;
        const productFound  = await Product.findById(id, { isDeleted: false }).populate('category');
        if (productFound) return res.status(200).json({ message: 'Datos del producto obtenido´s de forma exitosa', product: productFound })
        return res.status(400).json({ message: 'Datos del producto no encontrados' })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message })
    }
}

const deleteProduct =  async (req,res) => {
    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate({ _id : id }, { isDeleted: true });
        res.status(200).json({message: 'Product deleted correctly'})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
}

module.exports= {
    addProduct,
    getAllProducts,
    getProduct,
    deleteProduct
}
