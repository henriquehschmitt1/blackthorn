const ObjectId = require('mongoose').Types.ObjectId

class Validate {
    static validateItem(name, description, stock, price) {
        this.exists(name, 'name')
        this.exists(description, 'description')
        this.validateNumber(stock, 'stock')
        this.validateNumber(price, 'price')
    }

    static validateCartParams(cartId, itemId, quantity) {
        this.isValidId(itemId, 'itemId')
        this.isValidId(cartId, 'cartId')
        this.validateNumber(quantity, 'quantity')
    }

    static isObjectId(id) {
        if (new ObjectId(id) !== id) {
            throw {
                statusCode: 400,
                message: `${id} is not a valid mongo id`
            }
        }
    }

    static isValidId(param, paramName) {
        this.exists(param, paramName)
        this.isObjectId(param)
    }

    static exists(param, paramName) {
        if (!param) {
            throw {
                statusCode: 400,
                message: `Please inform the ${paramName} param`
            }
        }
    }

    static validateNumber(number, paramName) {
        this.exists(number, paramName)
        this.isNumber(number, paramName)
    }

    static isNumber(param, paramName) {
        if (typeof param !== 'number') {
            throw {
                statusCode: 400,
                message: `The ${paramName} param should be a number`
            }
        }
    }
}

module.exports = Validate
