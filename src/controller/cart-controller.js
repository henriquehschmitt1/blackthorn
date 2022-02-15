const CartService = require('../services/cart-service')

class CartController {
    static async onPost(req, res) {
        try {
            const { cartId, itemId, quantity } = req.body

            const cart = await CartService.associate(cartId, itemId, quantity)

            res.status(200).send(cart)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }
}

module.exports = CartController
