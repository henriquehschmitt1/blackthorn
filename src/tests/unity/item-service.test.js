const ItemService = require('../../services/item-service')
const CartService = require('../../services/cart-service')

const { itemMock } = require('../mock/item-mock')

const Item = require('../../model/item')
const Cart = require('../../model/cart')
const CartItem = require('../../model/cart-item')

describe('Item service', () => {
    afterAll(async () => {
        await Item.deleteMany({})
        await Cart.deleteMany({})
        await CartItem.deleteMany({})
    })
    describe('Success', () => {
        beforeEach(async () => {
            await Item.deleteMany({})
        })
        it('should be able to create an item into db', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)
            expect(item.id).toBeTruthy()
        })

        it('should be able to find all items into db', async () => {
            const { name, description, stock, price } = itemMock

            await ItemService.createItem(name, description, stock, price)
            await ItemService.createItem('other iphone', description, stock, price)

            const items = await ItemService.findItems()

            expect(items.length).toBe(2)
        })

        it('should be able to update an item in db', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)

            const updatedItem = await ItemService.updateItems(item._id.toString(), 'samsung', 'android phone', 15, 233)

            expect(updatedItem.name).toBe('samsung')
            expect(updatedItem.description).toBe('android phone')
            expect(updatedItem.stock).toBe(15)
            expect(updatedItem.price).toBe(233)
        })

        it('should be able to update an item in db, without name param', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)

            const updatedItem = await ItemService.updateItems(item._id.toString(), '', 'android phone', 15, 233)

            expect(updatedItem.name).toBe(name)
            expect(updatedItem.description).toBe('android phone')
            expect(updatedItem.stock).toBe(15)
            expect(updatedItem.price).toBe(233)
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
    afterAll(async () => {
        await Item.deleteMany({})
        await Cart.deleteMany({})
        await CartItem.deleteMany({})
    })
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
            expect(res.cart.subtotal).toBe(2000)
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

        it('should be able to checkout a cart by id without discount', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)

            const cart = await CartService.createCart()

            await CartService.associate(cart._id, item._id, 4)

            const res = await CartService.checkout(cart._id)

            expect(res.checkedOut).toBeTruthy()
            expect(res.total).toBe(2240)
        })

        it('should be able to checkout a cart by id with discount', async () => {
            const { name, description, stock, price } = itemMock

            const item = await ItemService.createItem(name, description, stock, price)

            const cart = await CartService.createCart()

            await CartService.associate(cart._id, item._id, 4)

            const res = await CartService.checkout(cart._id, 0.5)

            expect(res.checkedOut).toBeTruthy()
            expect(res.total).toBe(1120)
        })
    })

    describe('Fail', () => {
        beforeEach(async () => {
            await Item.deleteMany({})
            await Cart.deleteMany({})
            await CartItem.deleteMany({})
        })
        it('shouldnt be able to associate a cart and item into db with invalid id', async () => {
            try {
                await CartService.associate('123456123456', '123456123456', 4)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('123456123456 is not a valid mongo id')
            }
        })

        it('shouldnt be able to associate a cart and item into db if quantity is greater than stock', async () => {
            try {
                const { name, description, stock, price } = itemMock

                const item = await ItemService.createItem(name, description, stock, price)

                const cart = await CartService.createCart()

                const res = await CartService.associate(cart._id, item._id, 6)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('Quantity is greater than stock, please verify')
            }
        })

        it('shouldnt be able to checkout a cart by id with discount greater than 1', async () => {
            try {
                const { name, description, stock, price } = itemMock

                const item = await ItemService.createItem(name, description, stock, price)

                const cart = await CartService.createCart()

                await CartService.associate(cart._id, item._id, 4)

                const res = await CartService.checkout(cart._id, 5)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('discount param cannot be over 1')
            }
        })

        it('shouldnt be able to add an item to a cart if its already checked out', async () => {
            try {
                const { name, description, stock, price } = itemMock

                const item = await ItemService.createItem(name, description, stock, price)

                const cart = await CartService.createCart()

                await CartService.associate(cart._id, item._id, 4)

                await CartService.checkout(cart._id)

                await CartService.associate(cart._id, item._id, 1)
            } catch (error) {
                expect(error.statusCode).toBe(400)
                expect(error.message).toBe('This cart has already been checked out.')
            }
        })
    })
})
