class Validate {
    static validateItem(name, description, stock, price) {
        this.exists(name, 'name')
        this.exists(description, 'description')
        this.validateNumber(stock, 'stock')
        this.validateNumber(price, 'price')
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
