const { ArtistiModel, CanvaModel } = require('../../../models')
const auth = require('../../../auth')

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


    const foundUserArtist = await ArtistiModel.findOne({ email: email })
    const foundUserCanva = await CanvaModel.findOne({ email: email })


    const isValidPasswordArtist = await foundUserArtist?.validPassword(password)
    const isValidPasswordCanva = await foundUserCanva?.validPassword(password)

    if (!isValidPasswordArtist && !isValidPasswordCanva) return Promise.reject(errorResponse)
    // if (!isValidPasswordCanva) return Promise.reject(errorResponse)


    console.log(foundUserArtist);

    const res = foundUserArtist ? returnData(foundUserArtist) : returnData(foundUserCanva);
    // console.log(res);

    const token = auth.sign(res);

    return { token, user: res };
}

module.exports = {
    login,
};