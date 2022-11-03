const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')
const response = require('../network/response')

const secret = config.jwt.secret
function sign(data) {
    return jwt.sign(data, secret, { expiresIn: '365d' })
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    registered: async (req, res, next) => {
        try {
            const decoded = await decodeHeader(req);
            const errorResponse = {
                status: 401,
                message: 'Necesitas estas registrado'
            }
            const userId = decoded._id
            next()
        } catch (error) {
            response.error(req, res, error)
        }
    }
}

function getToken(auth) {
    if (!auth) {
        throw error('no viene el token', 401)
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw error('formato invalido', 401)
    }
    const token = auth.replace('Bearer ', '');
    return token
}

async function decodeHeader(req) {
    try {
        const authorization = req.headers.authorization || ''
        const token = getToken(authorization)
        const decoded = verify(token)
        req.user = decoded

        return Promise.resolve(decoded)
    } catch (error) {
        return Promise.reject({ status: 401, message: 'Token vencido' })
    }
}

module.exports = {
    sign,
    check
}