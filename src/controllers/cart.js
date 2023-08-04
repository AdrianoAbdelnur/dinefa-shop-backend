const Cart = require("../models/Cart");


const createCart = async(req,res) => {
    try {
        const {idProduct, quantity, price} = req.body
        const cartFound = await Cart.findOne({ owner: req.userId, cartStatus : 'active' })
        if(!cartFound){
            const payload = {
                products: [
                    req.body,
                ],
                owner: req.userId, 
            }
            const cart = new Cart(payload);
            await cart.save();
            return res.status(200).json({message: 'Producto agregado al Carrito exitosamente', payload});
        }
        const productFoundCart = cartFound.products?.find((cartItem)=> (cartItem.idProduct.toString() === idProduct))
        if(productFoundCart) {
            const newProductsList = cartFound.products?.map((cartItem)=>{  
                if ((cartItem.idProduct.toString() === idProduct)) {
                return {
                    idProduct,
                    quantity: quantity + cartItem.quantity,
                    price,
                }           
                }    
                return cartItem
            });
            const cartUpdate = await Cart.findByIdAndUpdate(cartFound._id, {products : newProductsList} , {new:true});
            return res.status(200).json({message: 'Producto agregado al Carrito exitosamente', cartUpdate});
        }
        const updatedCart = await Cart.findByIdAndUpdate(cartFound._id, {$push: {products: req.body}}, {new: true})
        return res.status(200).json({message: 'Producto agregado al Carrito exitosamente', updatedCart});
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
}

const getCarts = async (req, res) => {
    try {
        const ownCarts = await Cart.find({owner: req.userId}).populate("products.idProduct")
        res.status(200).json({message: 'Carritos obtenidos correctamente', ownCarts})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
};

const getAllCarts = async (req, res) => {
    try {
        const allCarts = await Cart.find().populate('owner').populate('products')
        res.status(200).json({message: 'Carts obtained correctly', allCarts})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
};


const deleteCart = async(req , res) =>{
    try {
        const {id} = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(id, {cartStatus: 'deleted'}, {new: true})
        res.status(200).json({message: 'Carrito borrado correctamente', updatedCart})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
}

const buyCart = async(req , res) =>{
    try {
        const {id} = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(id, {cartStatus: 'bought', boughtAt: Date.now()} , {new: true})
        res.status(200).json({message: 'Carrito vendido exitosamente', updatedCart})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
}

const cancelOrder = async(req , res) =>{
    try {
        const {id} = req.params;
        const cartToBeCancelled = await Cart.findByIdAndUpdate(id, {cartStatus: 'cancelled'}, {new: true})
        res.status(200).json({message: 'Carrito cancelado', cartToBeCancelled})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
}

const preparingOrder = async(req , res) =>{
    try {
        const {id} = req.params;
        const preparingCart = await Cart.findByIdAndUpdate(id, {cartStatus: 'preparing'}, {new: true})
        res.status(200).json({message: 'Orden en preparación', preparingCart})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
}

const delivered = async(req , res) =>{
    try {
        const {id} = req.params;
        const deliveredCart = await Cart.findByIdAndUpdate(id, {cartStatus: 'delivered'}, {new: true})
        res.status(200).json({message: 'Orden entregada', deliveredCart})
    } catch (error) {
        res.status(error.code || 500).json({message : error.message})
    }
}

module.exports = {
    createCart,
    getCarts,
    deleteCart,
    buyCart,
    getAllCarts,
    cancelOrder,
    preparingOrder,
    delivered
}