const Category = require('../models/Category');

const addCategory = async (req, res) => {
    try {
        const categoryToAdd = req.body; 
        const newCategory = new Category(categoryToAdd);
        await newCategory.save();
        res.status(200).json({ message: 'categoria creada con exito', newCategory })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message });
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categoriesFound  = await Category.find( { isDeleted: false });
        if (categoriesFound.length === 0) return res.status(400).json({ message: 'lista de categorias vacia' });
        return res.status(200).json({ message: 'categorias extraidas de forma exitosa', categories: categoriesFound })
    } catch (error) {
        res.status(error.code || 500).json({ message: error.message })
    }
}

module.exports = {
    addCategory,
    getAllCategories,
}