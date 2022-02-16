require('dotenv').config()
require('./src/config/database').connect()
const express = require('express')
const CartController = require('./src/controller/cart-controller')
const ItemController = require('./src/controller/item-controller')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send(
        'Please refer to the api docs to see all the routes :) https://github.com/henriquehschmitt1/blackthorn'
    )
})

app.post('/item', ItemController.onPost)

app.get('/item', ItemController.onGet)

app.put('/item/:itemId', ItemController.onPut)

app.post('/cart', CartController.onPost)

app.post('/cart/fill', CartController.addToCart)

app.get('/cart/:cartId', CartController.onGet)

app.post('/checkout/:cartId', CartController.onCheckout)

module.exports = app
