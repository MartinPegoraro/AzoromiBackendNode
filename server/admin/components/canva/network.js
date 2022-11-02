const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.post("/", function (req, res) {
    controller.createOne(req.body)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: 'producto creado con exito'
            })
        })
})

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

router.patch('/:id', function (req, res) {
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