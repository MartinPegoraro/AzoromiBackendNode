const express = require('express')
const response = require('../../../network/response')
const controller = require('./controller')
const router = express.Router()
const auth = require('../../../auth')
const { verify } = require('jsonwebtoken')

router.post('/login', function (req, res) {
    console.log(req.body);
    controller
        .login(req.body)
        .then((data) => {
            response.success(req, res, data, "Usuario logueado", 201)
        })
        .catch((err) => {
            response.error(req, res, err)
        })
})
router.get("/verify", auth.check.registered, (req, res) => {
    response.success(req, res, null, "el usuario existe", 200)
})

module.exports = router