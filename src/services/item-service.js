const ValidateService = require('../validations/validate')
const Item = require('../model/item')

class ItemService {
    static async createItem(req, res) {
        try {
            const { name, description, stock, price } = req.body

            ValidateService.validateItem(name, description, stock, price)
            ItemService.alreadyExists(name)

            res.status(200).send('noice')
        } catch (error) {
            res.status(error.statusCode).send(error.message)
        }
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
