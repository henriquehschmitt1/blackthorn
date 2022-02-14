require('dotenv').config({ path: './.env.test' })

require('./src/config/database').connect()

jest.setTimeout(60000)
