const ItemService = require('../../services/item-service')
const CartService = require('../../services/cart-service')

const { itemMock } = require('../mock/item-mock')

const Item = require('../../model/item')
const Cart = require('../../model/cart')
const CartItem = require('../../model/cart-item')

describe('Item service', () => {
    describe('Success', () => {
        beforeEach(async () => {
            await Item.deleteMany({})
        })
        it('should be able to create an item into db', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)
            expect(item.id).toBeTruthy()
        })
    })

    describe('Fail', () => {
        afterAll(async () => {
            await Item.deleteMany({})
        })
        it('shouldnt be able to create an item into db without name', async () => {
            const { description, stock, price } = itemMock

            try {
                await ItemService.createItem('', description, stock, price)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('Please inform the name param')
            }
        })

        it('shouldnt be able to create an item into db without description', async () => {
            const { name, stock, price } = itemMock

            try {
                await ItemService.createItem(name, '', stock, price)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('Please inform the description param')
            }
        })

        it('shouldnt be able to create an item into db without stock', async () => {
            const { name, description, price } = itemMock

            try {
                await ItemService.createItem(name, description, '', price)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('Please inform the stock param')
            }
        })

        it('shouldnt be able to create an item into db if stock is not a number', async () => {
            const { name, description, price } = itemMock

            try {
                await ItemService.createItem(name, description, '500', price)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('The stock param should be a number')
            }
        })

        it('shouldnt be able to create an item into db without price', async () => {
            const { name, description, stock } = itemMock

            try {
                await ItemService.createItem(name, description, stock, '')
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('Please inform the price param')
            }
        })

        it('shouldnt be able to create an item into db if price is not a number', async () => {
            const { name, description, stock } = itemMock

            try {
                await ItemService.createItem(name, description, stock, '5')
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('The price param should be a number')
            }
        })

        it('shouldnt be able to create an item into db with a duplicate name', async () => {
            const { name, description, stock, price } = itemMock

            try {
                await ItemService.createItem(name, description, stock, price)
                await ItemService.createItem(name, description, stock, price)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('Item already exists in DB')
            }
        })
    })
})

describe('Cart service', () => {
    describe('Success', () => {
        beforeEach(async () => {
            await Item.deleteMany({})
            await Cart.deleteMany({})
            await CartItem.deleteMany({})
        })

        it('should be able to create a cart into db', async () => {
            const cart = await CartService.createCart()

            expect(cart.subtotal).toBe(0)
            expect(cart.discount).toBe(0)
            expect(cart.taxes).toBe(0.12)
            expect(cart.total).toBe(0)
        })
        it('should be able to associate a cart and item into db', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)

            const cart = await CartService.createCart()

            const res = await CartService.associate(cart._id, item._id, 4)

            expect(res.cartItem).toBeTruthy()
            expect(res.cart.subtotal).toBe(500)
            expect(res.cart.updatedAt).toBeTruthy()
            expect(res.item.stock).toBe(1)
            expect(res.item.updatedAt).toBeTruthy()
        })

        it('should be able to get a cart by id', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)

            const cart = await CartService.createCart()

            await CartService.associate(cart._id, item._id, 4)

            const res = await CartService.getById(cart._id)

            expect(res.cart.subtotal).toBeTruthy()
            expect(res.items).toBeTruthy()
        })
    })

    describe('Fail', () => {
        it('should be able to associate a cart and item into db', async () => {
            try {
                await CartService.associate('123456123456', '123456123456', 4)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('123456123456 is not a valid mongo id')
            }
        })
    })
})
