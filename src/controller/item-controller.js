const ItemService = require('../services/item-service')

class ItemController {
    static async onPost(req, res) {
        try {
            const { name, description, stock, price } = req.body

            const item = await ItemService.createItem(name, description, stock, price)

            res.status(200).send(item)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }

    static async onGet(req, res) {
        try {
            const items = await ItemService.findItems()

            res.status(200).send(items)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }

    static async onPut(req, res) {
        try {
            const { itemId } = req.params
            const { name, description, stock, price } = req.body

            const items = await ItemService.updateItems(itemId, name, description, stock, price)

            res.status(200).send(items)
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
    }
}

module.exports = ItemController
