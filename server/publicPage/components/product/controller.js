const store = require('./store')

async function getAll() {
    return store.list()
}

module.exports = {
    getAll
}