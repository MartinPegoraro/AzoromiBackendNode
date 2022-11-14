const express = require('express')
const controller = require('./controller')
const router = express.Router()
const response = require('../../../network/response')
const auth = require('../../../auth')

router.post("/", function (req, res) {
    console.log(req.body, "req.body");
    controller.createOne(req.body)
        .then((data) => {
            console.log(data, 'createOne network');
            // res.status(200).json({
            //     message: 'usuario creado'
            // })
            response.success(req, res, data, 'Usuario creado', 201)
            return data
        })
        .catch((err) => {
            response.error(req, res, err)
        })
})

router.post("/send-codEmail", function (req, res) {
    console.log(req.body, "req.body");
    controller
        .confirm(req.body)
        .then((data) => {
            response.success(req, res, data, "¡Email confirmado!", 200)
        })
        .catch((err) => {
            response.error(req, res, err)
        });
});

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


router.get("/", function (req, res) {
    controller.getAll()
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: 'Productos'
            })
        })
})

router.get("/gender/:id", function (req, res) {
    controller.getOne(req.params.id)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: 'Producto'
            })
        })
})

router.get("/:gender", function (req, res) {
    controller.getOneGender(req.params.gender)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: `Todos los productos de ${data[0].gender}`
            })
        })
})

router.patch('/:id', auth.check.registered, function (req, res) {
    controller.update(req.params.id, req.body)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: "producto actualizado"
            })
        })
})

router.delete('/:id', function (req, res) {
    controller.deleteOne(req.params.id)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: "Porducto Elminiado"
            })
        })
})

module.exports = router