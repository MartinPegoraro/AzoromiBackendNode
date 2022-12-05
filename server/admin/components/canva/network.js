const express = require('express')
const controller = require('./controller')
const response = require('../../../network/response')

const router = express.Router()

router.post("/", function (req, res) {
    console.log('creando un lienzo');
    controller.createOne(req.body)
        .then((data) => {
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

router.get("/:id", function (req, res) {
    controller.getOne(req.params.id)
        .then((data) => {
            response.success(req, res, data, 'Usuario encontrado', 200)
        }).catch((err) => {
            console.log(err);
        })
})

router.get("/user/:id", function (req, res) {
    controller.getOneUser(req.params.id)
        .then((data) => {
            response.success(req, res, data, 'Usuario lienzo o artista encontrado', 200)
        }).catch((err) => {
            console.log(err);
        })
})


router.patch('/:id', function (req, res) {
    controller.update(req.params.id, req.body)
        .then((data) => {
            response.success(req, res, data, 'Se actualizo correctamente', 200)
        }).catch((err) => {
            console.log(err);
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