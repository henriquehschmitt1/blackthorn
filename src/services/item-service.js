const ValidateService = require('../validations/validate')
const Item = require('../model/item')

class ItemService {
    static async createItem(name, description, stock, price) {
        ValidateService.validateItem(name, description, stock, price)
        await ItemService.alreadyExists(name)

        const item = await Item.create({
            name,
            description,
            stock,
            price
        })

        return item
    }

    static async alreadyExists(name) {
        const item = await Item.findOne({ name })

        if (item) {
            throw {
                statusCode: 400,
                message: 'Item already exists in DB'
            }
        }
    }
}

module.exports = ItemService
