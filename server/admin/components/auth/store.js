const { ArtistiModel, CanvaModel } = require('../../../models')
const auth = require('../../../auth')
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');

const returnData = data => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        appRole: data.appRole,
        gender: data.gender,
        nickName: data.nickName,
        _id: data._id,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
};

async function login({ email, password }) {
    const errorResponse = {
        status: 401,
        message: "email o contraseña incorrecta"
    }

    const foundUserArtist = await ArtistiModel.findOne({ email: email, emailConfirm: true })
    const foundUserCanva = await CanvaModel.findOne({ email: email, emailConfirm: true })

    const isValidPasswordArtist = await foundUserArtist?.validPassword(password)
    const isValidPasswordCanva = await foundUserCanva?.validPassword(password)

    if (!isValidPasswordArtist && !isValidPasswordCanva) return Promise.reject(errorResponse)
    // if (!isValidPasswordCanva) return Promise.reject(errorResponse)


    console.log(foundUserArtist, 'foundUserArtist');
    console.log(foundUserCanva, 'foundUserCanva');


    const res = foundUserArtist ? returnData(foundUserArtist) : returnData(foundUserCanva);
    // console.log(res);

    const token = auth.sign(res);

    return { token, user: res };
}

async function codRecoverPass(data) {

    const errorResponse = {
        status: 401,
        message: "El correo no existe",
    }

    const cod = randomstring.generate(8)

    console.log(data, "desde codRecoverPass");

    const findEmailArtist = await ArtistiModel.findOne({ email: data.email })
    const findEmailCanva = await CanvaModel.findOne({ email: data.email })

    // console.log(findEmailCanva, 'findEmailCanva');

    // console.log(findEmailArtist, 'findEmailArtist');


    if (!findEmailArtist && !findEmailCanva) return Promise.reject(errorResponse)


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

    if (findEmailCanva !== null) {
        console.log('entro al canva');

        const updateCodRecoverPassCanva = await CanvaModel.findOneAndUpdate({ email: data.email }, { codPassRecover: cod }, {
            new: true,
            context: 'query',
        })
        // console.log(updateCodRecoverPassCanva, 'updateCodRecoverPassCanva');
        return updateCodRecoverPassCanva

    } else {
        console.log('entro al artista');
        const updateCodRecoverPassArtist = await ArtistiModel.findOneAndUpdate({ email: data.email }, { codPassRecover: cod }, {
            new: true,
            context: 'query',
        })

        // console.log(updateCodRecoverPassArtist, 'updateCodRecoverPassArtist');
        return updateCodRecoverPassArtist
    }
}

async function compareCod(data) {
    const errorResponse = {
        status: 401,
        message: "El correo no coincide con el codigo enviado"
    }

    const foundUserArtista = await ArtistiModel.findOne({ email: data.email, codPassRecover: data.codPassRecover })
    const foundUserCanva = await CanvaModel.findOne({ email: data.email, codPassRecover: data.codPassRecover })


    if (!foundUserArtista && !foundUserCanva) return Promise.reject(errorResponse)

    if (foundUserArtista !== null) {
        console.log('entro al artista');

        const updatePasswordArtist = await ArtistiModel.findOneAndUpdate({ _id: foundUserArtista._id }, { forgetPassConfirm: true })
        return returnData(updatePasswordArtist)
    } else {
        console.log('entro al canva');
        const updatePasswordCanva = await CanvaModel.findOneAndUpdate({ _id: foundUserCanva._id }, { forgetPassConfirm: true })
        return returnData(updatePasswordCanva)
    }
}

async function passChange(data) {
    console.log(data);
    const errorResponse = {
        status: 401,
        message: 'Las contrasenas no coiciden'
    }

    if (data.password !== data.repitPassword) return Promise.reject(errorResponse)

    const foundUserArtist = await ArtistiModel.findOne({ email: data.email })
    const foundUserCanva = await CanvaModel.findOne({ email: data.email })

    if (foundUserArtist !== null) {

        const updatePasswordArtist = await ArtistiModel.findOneAndUpdate({ _id: foundUserArtist._id }, { password: data.password })
        await updatePasswordArtist.setPassword(data.password)
        console.log('entro al artista');
        return returnData(updatePasswordArtist)
    } else {
        const updatePasswordCanva = await CanvaModel.findOneAndUpdate({ _id: foundUserCanva._id }, { password: data.password })
        await updatePasswordCanva.setPassword(data.password)
        console.log('entro al canva');
        return returnData(updatePasswordCanva)
    }

}
async function sendSearch({ search }) {

}


module.exports = {
    login,
    passChange,
    compareCod,
    codRecoverPass,
    sendSearch
};