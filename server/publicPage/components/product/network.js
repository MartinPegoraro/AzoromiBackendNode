const express = require('express')
const controller = require('./controller')
const router = express.Router()


router.get('/', function (req, res) {
    controller.getAll()
        .then((data) => {
            res.status(200).json({
                error: false,
                body: data,
                status: 200,
                message: 'Todos los productos'
            })
        })
})

module.exports = router;