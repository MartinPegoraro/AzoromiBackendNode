const { ArtistiModel, CanvaModel } = require('../../../models')
const auth = require('../../../auth')

const returnData = data => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        dni: data.dni,
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

    const foundUserArtist = await ArtistiModel.findOne({ email: email })
    // const foundUserCanva = await CanvaModel.findOne({ email: email })

    const isValidPasswordArtist = await foundUserArtist.validPassword(password)
    // const isValidPasswordCanva = await foundUserCanva.validPassword(password)

    if (!isValidPasswordArtist) return Promise.reject(errorResponse)

    console.log(isValidPasswordArtist);

    const res = returnData(foundUserArtist);
    // console.log(res);

    const token = auth.sign(res);

    return { token, user: res };
}

module.exports = {
    login,
};