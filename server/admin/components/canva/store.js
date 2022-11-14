const { CanvaModel, ArtistiModel } = require('../../../models')
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

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


    const createCanva = await CanvaModel.create({ ...data, codEmail: cod })
    await createCanva.setPassword(data.password)
    return returnData(createCanva)
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