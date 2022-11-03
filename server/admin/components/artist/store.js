const { ArtistiModel } = require('../../../models')

const returnData = data => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        appRole: data.appRole,
        gender: data.gender,
        nickName: data.nickName,
        _id: data._id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
}

async function add(data) {
    const createProduct = await ArtistiModel.create(data)
    await createProduct.setPassword(data.password)
    return returnData(createProduct)
}

async function getAll() {
    const getAll = await ArtistiModel.find({ isDeleted: false })
    return getAll
}

async function getOne(id) {
    const getOne = await ArtistiModel.findOne({ _id: id, isDeleted: false })
    console.log(getOne);
    return returnData(getOne)
}

async function getGender(gender) {
    const getGender = await ArtistiModel.find({ gender: gender, isDeleted: false })
    // console.log(getGender)
    return getGender
}

async function updateOne(id, data) {
    const updateProduct = await ArtistiModel.findByIdAndUpdate({ _id: id }, data, {
        new: true,
        constext: 'query',
    })

    return returnData(updateProduct)
}

async function remove(id) {
    console.log(id);
    const deleteOne = await ArtistiModel.findByIdAndUpdate({ _id: id }, { isDeleted: true })
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