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
})
