const http = require('http')
const app = require('./app')
const dotenv = require('dotenv')
dotenv.config()

function normalizePort(val) {
    const port = parseInt(val, 10)
    if (isNaN(port)) {
        return val
    }
    if (port >= 0) {
        return port
    }
    return false
}
const port = normalizePort(process.env.PORT || 1234)
app.set('port', port)

function errorHandler(error) {
    if (error.syscall !== 'listen') {
        throw error
    }
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    switch (error.code) {
        case 'EACCES':
            console.log(bind + ' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind + ' s already in use')
            process.exit(1)
            break
        default:
            throw error
    }
}
const server = http.createServer(app)
server.on('error', errorHandler)
server.on('listening', function () {
    const address = server.address()
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
    console.log('Listening on: ' + bind)
})
server.listen(port, process.env.HOSTNAME, function () {
    console.log('Running on http://' + process.env.HOSTNAME + ':' + port)
})