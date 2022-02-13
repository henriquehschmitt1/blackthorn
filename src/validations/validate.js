class Validate {
    static validateItem(name, description, stock, price) {
        this.exists(name, 'Please inform the name param')
        this.exists(description, 'Please inform the description param')
        this.validateNumber(stock, 'Please inform the stock param')
        this.validateNumber(price, 'Please inform the price param')
    }

    static exists(param, message = 'Please inform the param') {
        if (!param) {
            throw {
                statusCode: 400,
                message
            }
        }
    }

    static validateNumber(number, message) {
        this.exists(number, message)
        this.isNumber(number)
    }

    static isNumber(value) {
        return typeof value === 'number'
    }
}

module.exports = Validate
