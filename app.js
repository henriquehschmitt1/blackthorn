require('dotenv').config()
require('./src/config/database').connect()
const express = require('express')
const ItemService = require('./src/services/item-service')

const app = express()

app.use(express.json())

app.post('/item', ItemService.createItem)

module.exports = app
