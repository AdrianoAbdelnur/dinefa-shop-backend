const {body} = require('express-validator')
const User = require("./../models/User")

const createUsersValidations = async(req, res, next) => {
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password) return res.status(400).json({message: "Todos los campos son requeridos"})
        const userFound = await User.findOne({email})
        if(userFound) {
            return res.status(400).json({message: "El email ya esta en uso"})
        }
        next();
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const authUserValidations = () => {
    return[
        body('email').isEmail().withMessage("invalid email"),
    ]
}

module.exports= {
    createUsersValidations,
    authUserValidations,
}