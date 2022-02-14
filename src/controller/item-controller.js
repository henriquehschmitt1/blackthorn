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
}

module.exports = ItemController
