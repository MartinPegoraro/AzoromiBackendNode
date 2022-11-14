const mongoose = require("mongoose")
const { Schema } = mongoose
const { ObjectId } = Schema.Types


const MySchema = Schema(
    {
        idChat: {
            type: ObjectId,
            ref: 'Chat',
        },
        message: {
            type: String
        },
        idArtist: {
            type: ObjectId,
            ref: 'Artist',
        },
        idCanva: {
            type: ObjectId,
            ref: 'Canva',
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Message', MySchema)