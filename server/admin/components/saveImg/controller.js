const { ImageModel, ArtistiModel, CanvaModel, SaveImgModel } = require("../../../models")

async function createSaveImg(data) {
    console.log(data);
    const foundUserArtist = await ArtistiModel.findById({ _id: data.idUserSaveImg })
    const foundUserCanva = await CanvaModel.findById({ _id: data.idUserSaveImg })

    if (foundUserArtist) {
        const foundImgSave = await SaveImgModel.findOne({ idUserSaveImg: data.idUserSaveImg, idUserCreateImg: data.idUserCreateImg, imageId: data.imageId })
        // console.log(foundUserArtist, 'foundUserArtist');

        if (foundImgSave === null) {
            console.log('no existe este foundIMg artista');
            const createSaveImg = await SaveImgModel.create(data)
            foundUserArtist.imgSave.push(createSaveImg._id)
            foundUserArtist.save()
            // console.log(foundUserArtist, 'foundUserArtist');
            // console.log(createSaveImg, 'createSaveImg');
            return createSaveImg
        } else {
            return foundImgSave
        }
    } else {
        const foundImgSave = await SaveImgModel.findOne({ idUserSaveImg: data.idUserSaveImg, idUserCreateImg: data.idUserCreateImg, imageId: data.imageId })
        // console.log(foundUserArtist, 'foundUserArtist');

        if (foundImgSave === null) {
            console.log('no existe este foundIMg canva');

            const createSaveImg = await SaveImgModel.create(data)
            foundUserCanva.imgSave.push(createSaveImg._id)
            foundUserCanva.save()
            // console.log(foundUserCanva, 'foundUserCanva');
            // console.log(createSaveImg, 'createSaveImg');

            return createSaveImg
        } else {
            console.log('si existe');

            return foundImgSave
        }
    }

}

async function getImgSave(data) {
    const foundImgSave = await SaveImgModel.findOne({ idUserSaveImg: data.idUserSaveImg, idUserCreateImg: data.idUserCreateImg, imageId: data.imageId })
    console.log(foundImgSave);
    return foundImgSave
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
    createSaveImg,
    getImgSave
}