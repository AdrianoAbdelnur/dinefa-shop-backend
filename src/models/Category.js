const { model, Schema } = require('mongoose');

const CategorySchema = new Schema ({
    name: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false
})

const Category = model('Category', CategorySchema);

module.exports = Category; 