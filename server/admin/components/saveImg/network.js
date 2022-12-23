const express = require('express')
const controller = require('./controller')
const router = express.Router()
const response = require('../../../network/response')
const auth = require('../../../auth')

router.post("/createImgSave", function (req, res) {
    controller
        .createSaveImg(req.body)
        .then((data) => {
            response.success(req, res, data, "La imagen estaba guardada", 200)
        })
        .catch((err) => {
            console.log('error');
            // response.error(req, res, err)
        })
})

router.post("/getImgSave", function (req, res) {
    console.log(req.body);
    controller
        .getImgSave(req.body)
        .then((data) => {
            response.success(req, res, data, "La imagen estaba guardada", 200)
        })
        .catch((err) => {
            console.log('error');
            // response.error(req, res, err)
        })
})
router.patch("/savePublication/:id", function (req, res) {
    controller
        .saveImgPublication(req.body, req.params)
        .then((data) => {
            response.success(req, res, data, "Imagen guardada en canva", 200)
        })
        .catch((err) => {
            console.log('error');
        })
})
// router.post("/", function (req, res) {
//     // console.log(req.body.id);
//     controller
//         .saveImgArtist(req)
//         .then((data) => {
//             response.success(req, res, data, "Imagen guardada en artista", 200)
//         })
//         .catch((err) => {
//             console.log('error');
//             // response.error(req, res, err)
//         })
// })


module.exports = router