const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema(
    {
        cartId: {
            type: mongoose.ObjectId,
            required: true
        },
        itemId: {
            type: mongoose.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('cartItem', cartItemSchema)
