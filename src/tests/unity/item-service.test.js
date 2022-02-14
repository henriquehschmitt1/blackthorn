const ItemService = require('../../services/item-service')
const { itemMock } = require('../mock/item-mock')
const Item = require('../../model/item')

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
