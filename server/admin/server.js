const express = require('express');
const app = express()
const config = require('../config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./network/routes')
const cors = require('cors');

require('dotenv').config()

var url = `${process.env.MONGO_URI}`
mongoose.Promise = global.Promise

// const db = require('../db')

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
router(app)


const start = async () => {
    mongoose.connect(url, { useNewUrlparser: true }).then(
        () => {
            console.log('Conexion a la BD exitosa');
            app.listen(config.server.port, () =>
                console.log(
                    `Server: http://${config.server.host}:${config.server.port}`
                )
            )
        }
    )
}

start();