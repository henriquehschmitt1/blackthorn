require('dotenv').config()
require('./src/config/database').connect()
const express = require('express')
const ItemController = require('./src/controller/item-controller')

const app = express()

app.use(express.json())

app.post('/item', ItemController.onPost)

module.exports = app
