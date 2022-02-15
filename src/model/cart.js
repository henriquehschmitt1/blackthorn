const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        subtotal: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            required: true
        },
        taxes: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        checkedOut: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('cart', cartSchema)
