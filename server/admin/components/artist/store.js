const { ArtistiModel, CanvaModel } = require('../../../models')
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

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


    const createProduct = await ArtistiModel.create({ ...data, codEmail: cod })
    await createProduct.setPassword(data.password)
    return returnData(createProduct)
}

async function confirm(data) {
    const foundEmail = await ArtistiModel.findOne({ codEmail: data.codEmail, email: data.email })
    if (!foundEmail) {
        return Promise.reject({
            message: 'No se pudo confirmar'
        })
    }

    const confirm = await ArtistiModel.findOneAndUpdate({ email: data.email }, { emailConfirm: true })
    console.log(confirm, 'confirm');
    return returnData(confirm)
}

async function codRecoverPass(data) {

    const errorResponse = {
        status: 401,
        message: "El correo no existe",
    }

    const cod = randomstring.generate(8)

    console.log(data, "desde codRecoverPass");

    const findEmail = await ArtistiModel.findOne({ email: data.email })

    if (!findEmail) return Promise.reject(errorResponse)


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
    //     subject: "Prueba envio de recuperacion de contrasena ✔",
    //     html: `<b>Empresa que dio vida a azoromi y va por todo </b> <br>
    //             <h2>Su codigo para poder cambiar la contrasena es: </h2>
    //             <h3>${cod}</h3>`
    // }, (err, info) => {
    //     if (err) {
    //         // console.log(err, 'error en enviar el msj');
    //     } else {
    //         // console.log(info, 'msj enviado');
    //     }
    // });

    const updateCodRecoverPass = await ArtistiModel.findOneAndUpdate({ email: data.email }, { codPassRecover: cod }, {
        new: true,
        context: 'query',
    })
    // console.log(updateCodRecoverPass, 'updateCodRecoverPass desde recoverpass');
    return updateCodRecoverPass
}

async function compareCod(data) {
    const errorResponse = {
        status: 401,
        message: "El correo no coincide con el codigo enviado"
    }

    const foundUser = await ArtistiModel.findOne({ email: data.email, codPassRecover: data.codPassRecover })

    if (!foundUser) return Promise.reject(errorResponse)

    // const updatePassword = await ArtistiModel.findByIdAndUpdate({ email: data.email }, { password: data.password })
    const updatePassword = await ArtistiModel.findOneAndUpdate({ _id: foundUser._id }, { forgetPassConfirm: true })
    return returnData(updatePassword)
    // await updatePassword.setPassword(data.password)
    // console.log(updatePassword);
    // return returnData(updatePassword)
}

async function passChange(data) {
    console.log(data);
    const errorResponse = {
        status: 401,
        message: 'Las contrasenas no coiciden'
    }

    if (data.password !== data.repitPassword) return Promise.reject(errorResponse)

    const foundUser = await ArtistiModel.findOne({ email: data.email })

    const updatePassword = await ArtistiModel.findOneAndUpdate({ _id: foundUser._id }, { password: data.password })
    await updatePassword.setPassword(data.password)
    console.log(updatePassword);
    return returnData(updatePassword)
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
    remove,
    confirm,
    codRecoverPass,
    compareCod,
    passChange
}