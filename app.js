require('dotenv').config()
require('./src/config/database').connect()
const express = require('express')
const CartController = require('./src/controller/cart-controller')
const ItemController = require('./src/controller/item-controller')

const app = express()

app.use(express.json())

app.post('/item', ItemController.onPost)

app.post('/cart', CartController.onPost)

app.post('/cart/fill', CartController.addToCart)

app.get('/cart/:cartId', CartController.onGet)

module.exports = app
