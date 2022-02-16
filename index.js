require('dotenv').config()

const throng = require('throng')
const WORKERS = process.env.WEB_CONCURRENCY || 1

throng({
    worker: start,
    lifetime: Infinity,
    count: WORKERS
})

function start() {
    const http = require('http')
    const app = require('./app')
    const server = http.createServer(app)

    const port = process.env.PORT || 8080

    server.listen(port, () => {
        console.log(`Server running on port ${port}`)
    })
}
