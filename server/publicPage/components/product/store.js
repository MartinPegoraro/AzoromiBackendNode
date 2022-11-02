const { ProductsModel } = require('../../../models')

const returnData = data => {
    return {
        name: data.name,
        price: data.price,
        gender: data.gender,
        description: data.description,
        isDeleted: data.isDeleted
    }
}

async function list() {
    const getAll = await ProductsModel.find({ isDeleted: false })
    return getAll
}

module.exports = {
    list
}