const { model, Schema, default: mongoose } = require('mongoose');

const ProductSchema = new Schema ({
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
    model: {
        type: String,
    },
    image: {
        type: String,
        default: 'data:image/jpeg;base64,//',
    },
    description: {
        type: String,
    },
    details: [{
        name: {
            type: String,
        },
        detail: {
            type: String,
        },
        _id: false
}],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type:Number,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false
})

const Product = model('Product', ProductSchema);

module.exports = Product; 