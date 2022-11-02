const store = require('./store')

async function createOne(data) {
    return store.add(data)
}

async function getAll() {
    return store.getAll()
}

async function getOne(id) {
    return store.getOne(id)
}

async function getOneGender(gender) {
    return store.getGender(gender)
}

async function update(id, data) {
    return store.updateOne(id, data)
}

async function deleteOne(id) {
    return store.remove(id)
}

module.exports = {
    createOne,
    getAll,
    getOne,
    getOneGender,
    update,
    deleteOne
}