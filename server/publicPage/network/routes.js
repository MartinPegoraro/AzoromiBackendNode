const product = require('../components/product/network')

const routes = function (server) {
    server.use('/publicProdcut', product)
}

module.exports = routes;