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

router.post('/sendSearch', function (req, res) {
    controller
        .search(req.body)
        .then((data) => {
            response.success(req, res, data, "Usuario logueado", 201)
        })
        .catch((err) => {
            response.error(req, res, err)
        })
})


router.post("/send-codRecoverPass", function (req, res) {
    console.log(req.body, "req.body");
    controller
        .sendCodRecoverPass(req.body)
        .then((data) => {
            response.success(req, res, data, "¡Codigo de recuperacion de password enviado!", 200)
            return data
        })
        .catch((err) => {
            response.error(req, res, err)
        });
});

router.post("/checkCod", function (req, res) {
    // console.log(req.body, "req.body");
    controller
        .checkCod(req.body)
        .then((data) => {
            response.success(req, res, data, "¡Codigo cheakeado!", 200)
        })
        .catch((err) => {
            response.error(req, res, err)
        });
});

router.post("/recoverPass", function (req, res) {
    // console.log(req.body, "req.body");
    controller
        .changePassword(req.body)
        .then((data) => {
            response.success(req, res, data, "¡password cambiada!", 200)
        })
        .catch((err) => {
            response.error(req, res, err)
        });
});

module.exports = router