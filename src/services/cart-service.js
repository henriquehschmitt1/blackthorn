const ValidateService = require('../validations/validate')
const Item = require('../model/item')
const Cart = require('../model/cart')
const CartItem = require('../model/cart-item')
const tax = 0.12

class CartService {
    static async associate(cartId, itemId, quantity) {
        ValidateService.validateCartParams(cartId, itemId, quantity)
        const { price, stock } = await CartService.getItemById(itemId)

        CartService.checkStock(quantity, stock)

        const cartItem = await CartItem.create({
            itemId,
            cartId,
            quantity
        })
        const { subtotal } = await CartService.getCartById(cartId)

        const updatedAt = new Date()
        const cart = await Cart.findOneAndUpdate(
            { _id: cartId },
            { subtotal: subtotal + price, updatedAt },
            { new: true }
        )
        const item = await Item.findOneAndUpdate({ _id: itemId }, { stock: stock - quantity, updatedAt }, { new: true })

        return { cartItem, cart, item }
    }

    static async createCart() {
        return Cart.create({
            subtotal: 0,
            discount: 0,
            taxes: tax,
            total: 0
        })
    }

    static async getById(cartId) {
        ValidateService.isValidId(cartId, 'cartId')

        const cart = await CartService.getCartById(cartId)

        const cartItems = await CartItem.find(cartId)

        const items = []

        for (let cartItem of cartItems) {
            const { name, description, price } = await CartService.getItemById(cartItem.itemId)

            items.push({
                name,
                description,
                price,
                quantity: cartItem.quantity
            })
        }

        return { cart, items }
    }

    static async getItemById(id) {
        const item = await Item.findById(id)
        if (!item) {
            throw {
                statusCode: 400,
                message: `The informed id (${id}) does not exists in db`
            }
        }
        return item
    }

    static async getCartById(id) {
        const cart = await Cart.findById(id).lean()
        if (!cart) {
            throw {
                statusCode: 400,
                message: `The informed id (${id}) does not exists in db`
            }
        }
        return cart
    }

    static checkStock(quantity, stock) {
        if (quantity > stock) {
            throw {
                statusCode: 400,
                message: 'Quantity is greater than stock, please verify'
            }
        }
    }
}

module.exports = CartService
