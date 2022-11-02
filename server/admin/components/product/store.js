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

async function add(data) {
    const createProduct = await ProductsModel.create(data)
    return returnData(createProduct)
}

async function getAll() {
    const getAll = await ProductsModel.find({ isDeleted: false })
    return getAll
}

async function getOne(id) {
    const getOne = await ProductsModel.findOne({ _id: id, isDeleted: false })
    console.log(getOne);
    return returnData(getOne)
}

async function getGender(gender) {
    const getGender = await ProductsModel.find({ gender: gender, isDeleted: false })
    // console.log(getGender)
    return getGender
}

async function updateOne(id, data) {
    const updateProduct = await ProductsModel.findByIdAndUpdate({ _id: id }, data, {
        new: true,
        constext: 'query',
    })

    return returnData(updateProduct)
}

async function remove(id) {
    console.log(id);
    const deleteOne = await ProductsModel.findByIdAndUpdate({ _id: id }, { isDeleted: true })
    console.log(deleteOne);
    // return returnData(deleteOne)
}

module.exports = {
    add,
    getAll,
    getOne,
    getGender,
    updateOne,
    remove
}