const controller = require('./controller')
const express = require('express')
const router = express.Router()
const multer = require('multer')

const upload = multer({ dest: 'public/' })

// const storage = multer.diskStorage({
//     destination: 'public/profileImg',
//     filename: function (req, file, cb) {
//         cb("", Data.now() + file.originalname)
//     }
// })
// const upload = multer({
//     storage: storage
// })



router.post("/", function (req, res) {
    console.log(req.body);
    controller.createOne(req.body)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: 'Vendedor Creado'
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
                message: 'todos los Vendedores'
            })
        })
})

router.get('/:id', function (req, res) {
    controller.getOne(req.params.id)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: `Vendedor ${data.lastName}`
            })
        })
})

router.patch('/:id', upload.array('image'), function (req, res) {
    controller.updateOne({ ...req.body, imagesWork: req.files }, req.params.id)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: `Vendedor ${data.lastName} actualizado`
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
                message: `Vendedor ${data.lastName} Eliminado`
            })
        })
})

router.delete('/:id/deleteImg/:filename', function (req, res) {
    // console.log(req.params);
    controller.deleteImg(req.params.id, req.params.filename)
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: `Imagen Eliminada`
            })
        })
})

module.exports = router