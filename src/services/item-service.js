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

    static async findItems() {
        return Item.find({}).lean()
    }

    static async updateItems(itemId, name, description, stock, price) {
        ValidateService.isValidId(itemId, 'itemId')
        await ItemService.alreadyExists(name)

        const item = await Item.findById(itemId)

        const update = ItemService.setUpdate(item, { name, description, stock, price })

        ValidateService.validateItem(update.name, update.description, update.stock, update.price)

        return Item.findOneAndUpdate({ _id: itemId }, update, { new: true })
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

    static setUpdate(item, config) {
        const update = {
            name: '',
            description: '',
            stock: 0,
            price: 0
        }
        const keys = Object.keys(config)
        for (let key of keys) {
            update[key] = config[key]
            if (!config[key]) {
                update[key] = item[key]
            }
        }
        return update
    }
}

module.exports = ItemService
