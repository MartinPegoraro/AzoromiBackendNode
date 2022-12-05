const { CanvaModel, ArtistiModel, ImageModel } = require('../../../models')
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

const returnData = data => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        appRole: data.appRole,
        gender: data.gender,
        genderTatoo: data.genderTatoo,
        nickName: data.nickName,
        _id: data._id,
        imgSave: data.imgSave,
        imagesWork: data.imagesWork,
        imagesProfile: data.imagesProfile,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    }
}


const populateImage = {
    path: "imagesWork",
    select: "imageId roleUser description",
};

const populateImageProfile = {
    path: "imagesProfile",
    select: "imageId roleUser description",
};


async function add(data) {
    const errorResponse = {
        status: 401,
        message: "Este correo ya existe"
    }

    const foundArtist = await ArtistiModel.findOne({ email: data.email })
    const foundCanva = await CanvaModel.findOne({ email: data.email })

    if (foundArtist || foundCanva) {
        console.log(' con correo igual');
        return Promise.reject(errorResponse)
    }

    const cod = randomstring.generate(8)

    // const transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: process.env.EMAIL,
    //         pass: process.env.PASS
    //     },
    //     tls: {
    //         rejectUnauthorized: false
    //     },
    // });

    // await transporter.sendMail({
    //     from: '"Azor Ahai " <azorahai080994@gmail.com>',
    //     to: data.email,
    //     subject: "Prueba de envio de correo con codigo de verificacion ✔",
    //     html: `<b>Empresa que dio vida a azoromi y va por todo </b> <br>
    //             <h2>Su codigo de verificacion es: </h2>
    //             <h3>${cod}</h3>`
    // }, (err, info) => {
    //     if (err) {
    //         console.log(err, 'error en enviar el msj');
    //     } else {
    //         console.log('msj enviado');
    //     }
    // });
    // console.log(data, "data");


    const createCanva = await CanvaModel.create({ ...data, codEmail: cod, imagesProfile: '123' })
    await createCanva.setPassword(data.password)
    return returnData(createCanva)
}

async function confirm(data) {
    const foundEmail = await CanvaModel.findOne({ codEmail: data.codEmail, email: data.email })
    if (!foundEmail) {
        return Promise.reject({
            message: 'No se pudo confirmar'
        })
    }

    const confirm = await CanvaModel.findOneAndUpdate({ email: data.email }, { emailConfirm: true })
    console.log(confirm, 'confirm');
    return returnData(confirm)
}

async function getAll() {
    const getAll = await ArtistiModel.find({ isDeleted: false })
    return getAll
}

async function getOne(id) {
    // console.log(id);
    const getOne = await CanvaModel.findOne({ _id: id, isDeleted: false })
    return returnData(getOne)
}

async function getUser(id) {
    const getOneCanva = await CanvaModel.findOne({ _id: id, isDeleted: false }).populate(populateImage).populate('imgSave')
    const getOneArtist = await ArtistiModel.findOne({ _id: id, isDeleted: false }).populate(populateImage).populate('imgSave')
    if (getOneCanva !== null) {
        return returnData(getOneCanva)
    } else {
        return returnData(getOneArtist)
    }
}


async function updateOne(id, data) {
    const updateProduct = await CanvaModel.findByIdAndUpdate({ _id: id }, data, {
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

    updateOne,
    remove,
    confirm,
    getUser
}