const { ImageModel, ArtistiModel, CanvaModel, SaveImgModel } = require("../../../models")

async function createSaveImg(data) {
    const foundUserArtist = await ArtistiModel.findById({ _id: data.idUserSaveImg })
    const foundUserCanva = await CanvaModel.findById({ _id: data.idUserSaveImg })

    if (foundUserArtist) {
        const foundImgSave = await SaveImgModel.findOne({ idImage: data.idImage, idUserSaveImg: data.idUserSaveImg, idUserCreateImg: data.idUserCreateImg, imageId: data.imageId })
        if (foundImgSave === null) {
            const createSaveImg = await SaveImgModel.create(data)
            foundUserArtist.imgSave.push(createSaveImg._id)
            foundUserArtist.save()
            console.log(foundUserArtist, 'foundUserArtist');
            console.log(createSaveImg, 'createSaveImg');

            return createSaveImg
        } else {
            return foundImgSave
        }
    }

}

async function saveImgPublication(savedImg, id) {
    const updateSavedImg = await SaveImgModel.findByIdAndUpdate({ _id: id.id }, { savedImg: savedImg.savedImg }, {
        new: true,
        constext: 'query',
    })
    return updateSavedImg
}
async function saveImgArtist() {

}


module.exports = {
    saveImgPublication,
    saveImgArtist,
    createSaveImg
}