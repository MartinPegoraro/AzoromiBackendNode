const mongoose = require("mongoose")
const message = require("./message")
const { Schema } = mongoose
const { ObjectId } = Schema.Types


const MySchema = Schema(
    {
        idCanva: {
            type: ObjectId,
            ref: 'Canva',
        },
        idArtist: {
            type: ObjectId,
            ref: 'Artist',
        },
        messages: [{
            type: ObjectId,
            ref: 'Message',
        }]
    }, { timestamps: true }
)

module.exports = mongoose.model('Chat', MySchema)