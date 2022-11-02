const { SellerModel } = require('../../../models')

const returnData = data => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        genre: data.genre,
        nickName: data.nickName,
        genderTatoo: data.genderTatoo,
    }
}

async function add(data) {
    console.log("arranca el store", data);
    const create = await SellerModel.create(data)
    return returnData(create)
}

async function list() {
    const listAll = await SellerModel.find({ isDeleted: false })
    return listAll
}

async function getseller(id) {
    const getOne = await SellerModel.findById({ _id: id, isDeleted: false })
    return returnData(getOne)
}

async function updateSeller(data, id) {
    const updateOne = await SellerModel.findByIdAndUpdate({ _id: id }, data, {
        new: true,
        context: 'query'
    })
    return returnData(updateOne)
}

async function remove(id) {
    const deleteOne = await SellerModel.findByIdAndUpdate({ _id: id }, { isDeleted: true })
    return returnData(deleteOne)
}

async function removeImg(id, filenameImg) {
    const deleteImgSeller = await SellerModel.findById({ _id: id })
    // console.log(filenameImg);
    let acum = 0
    const deleteImg = deleteImgSeller.imagesWork.map((img) => {
        acum = 1 + acum
        if (img.filename === filenameImg) {
            let index = acum - 1
            return index

        }
    })
    deleteImgSeller.imagesWork.splice(deleteImg[1], 1)
    await SellerModel.findByIdAndUpdate({ _id: id }, deleteImgSeller, {
        new: true,
        context: 'query'
    })
}


module.exports = {
    add,
    list,
    getseller,
    updateSeller,
    remove,
    removeImg
}