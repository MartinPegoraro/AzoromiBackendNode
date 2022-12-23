const express = require('express');
const app = express()
const config = require('../config')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./network/routes')
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { ChatModel, MessageModel } = require('../models');
const fileupload = require("express-fileupload")

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
    console.log('se realizo la conexion');
    let room = null;
    let foundChat = null
    socket.on("join", async (idActualUser, idOtherUser, appRole) => {
        console.log("🚀 ~ file: server.js:30 ~ socket.on ~ idOtherUser", idOtherUser)
        console.log("🚀 ~ file: server.js:30 ~ socket.on ~ idActualUser", idActualUser)

        if (appRole === 'artist') {
            foundChat = await ChatModel.findOne({ idCanva: idOtherUser, idArtist: idActualUser })
            if (foundChat === null) {
                // console.log(foundChat, '123');
                foundChat = await ChatModel.create({ idCanva: idOtherUser, idArtist: idActualUser })
                // console.log(foundChat);
                room = foundChat._id
            } else {
                console.log('ya existe este chat');
                room = foundChat._id
            }
        } else {
            foundChat = await ChatModel.findOne({ idCanva: idActualUser, idArtist: idOtherUser })
            if (foundChat === null) {
                foundChat = await ChatModel.create({ idCanva: idActualUser, idArtist: idOtherUser })
                room = foundChat._id
            } else {
                console.log('ya existe este chat');
                room = foundChat._id
            }
        }
        // room = idChat.toString();

        socket.join(room);
        console.log("🚀 ~ file: server.js:56 ~ socket.on ~ room", room)

        const msgModel = await MessageModel.find()
        const msgInChat = await Promise.all(foundChat.messages.map(async (x) => {
            const foundMsgInChat = await MessageModel.findOne({ _id: String(x) })
            // console.log(foundMsgInChat);
            return foundMsgInChat
        }))

        // console.log(msgInChat, 'msgInChat');

        io.to(room).emit("messagesSaved", foundChat, msgInChat);

    });

    socket.on("newMessage", async (formMessage) => {
        console.log(formMessage);
        const addMsgChat = await ChatModel.findById({ _id: formMessage.idChat })
        const newMessage = await MessageModel.create(formMessage);
        addMsgChat.messages.push(newMessage._id)
        await addMsgChat.save();
        io.to(room).emit("emitNewMessage", newMessage)
    });
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
app.use(fileupload())
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