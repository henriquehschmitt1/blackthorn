require('dotenv').config()
require('./src/config/database').connect()
const express = require('express')

const app = express()

app.use(express.json())

app.post('/item', File.registerFile)

module.exports = app
