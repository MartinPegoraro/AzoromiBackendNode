const product = require('../components/product/network')
const seller = require('../components/seller/network')
const artist = require('../components/artist/network')
const canva = require('../components/canva/network')
const auth = require('../components/auth/network')
const chat = require('../components/chat/network')
const image = require("../components/image/network")


const routes = function (server) {
    server.use('/product', product),
        server.use('/seller', seller),
        server.use('/artist', artist),
        server.use('/canva', canva)
    server.use('/auth', auth)
    server.use('/chat', chat)
    server.use("/upload", image)
}
module.exports = routes