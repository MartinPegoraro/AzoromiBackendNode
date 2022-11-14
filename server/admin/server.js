const express = require('express');
const app = express()
const config = require('../config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./network/routes')
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origins:
            [process.env.CUSTOM_DOMAIN, process.env.REACT_APP_URL] ||
            "http://localhost:3000/",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    }
},);

io.on("connection", (socket) => {
    console.log('se realizo la coneccion');
    // let room = null;
    // socket.on("join", async (idChat, callback) => {
    //     room = idChat.toString();
    //     socket.join(room);

    //     let usersInRoom = io.sockets.adapter.rooms.get(room).size;
    //     if (usersInRoom > 1) {
    //         io.to(room).emit("connectStatusInicial", "En línea");
    //     }

    //     const messagesSaves = await findMessages(idChat);
    //     io.to(room).emit("messagesSaved", messagesSaves);
    //     io.to(room).emit("connectStatus", socket.id);
    //     // console.log("Mensajes guardados", messagesSaves);
    // });

    // socket.on("message", async (idChat, message, userMessage) => {
    //     const newMessage = await createMessage(idChat, message, userMessage);

    //     io.to(room).emit("newMessage", newMessage);
    // });
    // socket.on("disconnect", async (data) => {
    //     console.log("Usuario desconectado", socket.id);
    //     io.to(room).emit("disconnectStatus", socket.id);
    //     // socket.broadcast.to(room).emit("Status", {});
    // });
});

// io.on("connection", (socket) => {
//     console.log('se establecio la conexion de socket');
// });

// io.on("newMessage", (formMessage) => {
//     console.log('se establecio la conexion de socket', formMessage);
// });

// httpServer.listen(5001);


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
            httpServer.listen(config.server.port, () =>
                console.log(
                    `Server: http://${config.server.host}:${config.server.port}`
                )
            )
        }
    )
}

start();