const express = require('express')
const store = require('./store')
const router = express.Router()

router.get("/", function (req, res) {
    console.log('creando un lienzo');
    store.connection()
})
module.exports = router
