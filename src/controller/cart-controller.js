const CartService = require('../services/cart-service')

class CartController {
    static async onPost(req, res) {
        try {
            const cart = await CartService.createCart()

            res.status(200).send(cart)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }

    static async addToCart(req, res) {
        try {
            const { cartId, itemId, quantity } = req.body

            const cart = await CartService.associate(cartId, itemId, quantity)

            res.status(200).send(cart)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }

    static async onGet(req, res) {
        try {
            const { cartId } = req.params

            const cart = await CartService.getById(cartId)

            res.status(200).send(cart)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }

    static async onCheckout(req, res) {
        try {
            const { cartId } = req.params
            const { discount } = req.body

            const cart = await CartService.checkout(cartId, discount)

            res.status(200).send(cart)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }
}

module.exports = CartController
