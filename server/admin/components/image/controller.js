const { EnvironmentCredentials } = require("aws-sdk")
const aws = require("aws-sdk")
const { ImageModel, ArtistiModel, CanvaModel, ChatModel } = require("../../../models")

const s3 = new aws.S3({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
})

async function uploadImg(req) {
    //   console.log("uploadImg", req.body)
    //   console.log(req.files.foto)
    // console.log(req.body);
    // console.log(req.files.foto, 'foto');

    const id = req.body.id
    const formato = req.body.formato
    // const imagen = req.body.foto
    const imagen = req.files.foto.data

    // console.log(req.files.foto.data, 'image');

    const path = `imgUpload/${id}.${formato}`

    var paramPut = {
        Bucket: "azoromi-img",
        ContentType: "image/jpg",
        ACL: "public-read",
        Key: path, //Aca se coloca el nombre que va a aparecer en s3
        Body: imagen, //Lo que queremos enviar
    }

    s3.putObject(paramPut, (err, data) => {
        if (err) throw err
        console.log(data)
    })

    return ({
        status: 200,
        message: 'se subio correctamente la imagen'
    })
}

async function uploadInUser(data, userId) {
    const foundUserArtist = await ArtistiModel.findById({ _id: userId.id })
    const foundUserCanva = await CanvaModel.findById({ _id: userId.id })

    console.log(foundUserCanva);

    if (foundUserArtist === null) {
        console.log('canva no es undefined');
        const createImg = await ImageModel.create({ imageId: data.imageId, userPost: userId.id, roleUser: foundUserCanva.appRole, description: data.description })
        console.log(createImg._id);
        foundUserCanva.imagesWork.push(createImg._id)
        console.log(foundUserCanva, '1');

        await foundUserCanva.save()
        console.log(foundUserCanva, '2');
        return createImg

    } else {
        console.log('artista no es undefined');
        const createImg = await ImageModel.create({ imageId: data.imageId, userPost: userId.id, roleUser: foundUserArtist.appRole, description: data.description })
        console.log(createImg._id);
        foundUserArtist.imagesWork.push(createImg._id)
        await foundUserArtist.save()
        console.log(foundUserArtist);
        return createImg
    }

}

async function updateImgProfile(data, userId) {
    const foundUserArtist = await ArtistiModel.findById({ _id: userId.id })
    const foundUserCanva = await CanvaModel.findById({ _id: userId.id })

    if (foundUserArtist === null) {
        const createImg = await ImageModel.create({ imageId: data.imageId, userPost: userId.id, roleUser: foundUserCanva.appRole, isImgProfile: true })
        await CanvaModel.findByIdAndUpdate({ _id: foundUserCanva._id }, { imagesProfile: data.imageId })
        return createImg

    } else {
        const createImg = await ImageModel.create({ imageId: data.imageId, userPost: userId.id, roleUser: foundUserArtist.appRole, isImgProfile: true })
        await ArtistiModel.findByIdAndUpdate({ _id: foundUserArtist._id }, { imagesProfile: data.imageId })
        return createImg
    }

}
async function getAllCanva() {
    const foundImg = await ImageModel.find({ roleUser: 'canva', isImgProfile: false })
    return foundImg
}

async function getAllArtiist() {
    const foundImg = await ImageModel.find({ roleUser: 'artist', isImgProfile: false })
    return foundImg
}

async function deleteImg(id) {
    const deleteOne = await ImageModel.findByIdAndUpdate({ _id: id }, { isDeleted: true })
    return deleteOne
}

async function getChatArtist(id) {
    const foundChatsArtisti = await ChatModel.find({ idArtist: id }).populate('idCanva')
    return foundChatsArtisti
}

async function getChatCanva(id) {
    const getChatCanva = await ChatModel.find({ idCanva: id }).populate('idArtist')
    return getChatCanva
}

module.exports = {
    uploadImg,
    uploadInUser,
    getAllCanva,
    getAllArtiist,
    updateImgProfile,
    deleteImg,
    getChatArtist,
    getChatCanva

}