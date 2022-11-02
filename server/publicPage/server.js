const express = require('express');
const app = express()
const config = require('../config');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./network/routes')
require('dotenv').config()

var url = `${process.env.MONGO_URI}`
mongoose.Promise = global.Promise

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
router(app)

const start = async () => {
    mongoose.connect(url, { useNewUrlparser: true }).then(
        () => {
            console.log('Conexion a la base de datos Publica exitosa');
            app.listen(config.serverPublic.port, () =>
                console.log(`Server: http:// ${config.serverPublic.host}: ${config.serverPublic.port}`)
            )
        }
    )
}

start()