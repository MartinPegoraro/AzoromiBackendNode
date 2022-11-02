const store = require('./store')

async function createOne(data) {
    return store.add(data)
}

async function getAll() {
    return store.list()
}

async function getOne(id) {
    return store.getseller(id)
}

async function updateOne(data, id) {
    return store.updateSeller(data, id)
}

async function deleteOne(id) {
    return store.remove(id)
}

async function deleteImg(id, filenameImg) {
    return store.removeImg(id, filenameImg)
}

module.exports = {
    createOne,
    getAll,
    getOne,
    updateOne,
    deleteOne,
    deleteImg
}