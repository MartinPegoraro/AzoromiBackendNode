const express = require("express")
const controller = require("./controller")
const router = express.Router()
const response = require("../../../network/response")

router.post("/", function (req, res) {
    // console.log(req.body.id);
    controller
        .uploadImg(req)
        .then((data) => {
            response.success(req, res, data, "Imagen guardada", 200)
        })
        .catch((err) => {
            console.log('error');
            // response.error(req, res, err)
        })
})
router.post("/uploadInUser/:id", function (req, res) {
    controller
        .uploadInUser(req.body, req.params)
        .then((data) => {
            console.log(data, 'data data');
            response.success(req, res, data, 'Se guardo imagen en el usuario', 200)
        })
        .catch(error => {
            console.log('error');
        })
})

// router.post("/uploadInUserCanva/:id", function (req, res) {
//     controller
//         .uploadInUserCanva(req.body, req.params)
//         .then((data) => {
//             console.log(data, 'data data data');
//             response.success(req, res, data, 'Se guardo imagen en el usuario', 200)
//         })
//         .catch(error => {
//             console.log('error');
//         })
// })

router.post("/updateImgProfile/:id", function (req, res) {
    controller
        .updateImgProfile(req.body, req.params)
        .then((data) => {
            console.log(data, 'data data data');
            response.success(req, res, data, 'Se guardo imagen en el usuario', 200)
        })
        .catch(error => {
            console.log('error, error');
        })
})

router.get("/getAllCanva", function (req, res) {
    controller
        .getAllCanva()
        .then((data) => {
            response.success(req, res, data, 'todas las imagenes canva', 200)
        })
        .catch((err) => {
            console.log('error');
        })
})
router.get("/getAllArtist", function (req, res) {
    controller
        .getAllArtiist()
        .then((data) => {
            response.success(req, res, data, 'todas las imagenes de artistas', 200)
        })
        .catch((err) => {
            console.log('error');
        })
})
router.delete("/deleteImg/:id", function (req, res) {
    controller
        .deleteImg(req.params.id)
        .then((data) => {
            response.success(req, res, data, 'Imagen eliminada', 200)
        })
        .catch((err) => {
            console.log('error');
        })
})

router.get("/getChatArtist/:id", function (req, res) {
    controller
        .getChatArtist(req.params.id)
        .then((data) => {
            response.success(req, res, data, 'Imagen eliminada', 200)
        })
        .catch((err) => {
            console.log('error');
        })
})

router.get("/getChatCanva/:id", function (req, res) {
    controller
        .getChatCanva(req.params.id)
        .then((data) => {
            response.success(req, res, data, 'Imagen eliminada', 200)
        })
        .catch((err) => {
            console.log('error');
        })
})

module.exports = router