const express = require("express")
const controller = require("./controller")
const router = express.Router()
const response = require("../../../network/response")

router.post("/", function (req, res) {
    controller
        .uploadImg(req)
        .then((data) => {
            console.log('imagen guardada');
            // response.success(res, data, "Imagen guardada", 200)
        })
        .catch((err) => {
            console.log('error');
            // response.error(req, res, err)
        })
})

module.exports = router