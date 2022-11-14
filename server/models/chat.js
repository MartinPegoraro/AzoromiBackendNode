const mongoose = require("mongoose")
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
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Chat', MySchema)