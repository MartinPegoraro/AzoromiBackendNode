const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const MySchema = Schema(
    {
        idImage: {
            type: ObjectId,
            ref: 'Images'
        },
        idUserSaveImg: {
            type: String
        },
        idUserCreateImg: {
            type: String
        },
        imageId: {
            type: String
        },
        savedImg: {
            type: Boolean,
            default: false
        },

    }
)

module.exports = mongoose.model('SaveImage', MySchema)