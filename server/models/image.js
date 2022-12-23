const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const MySchema = Schema(
    {
        imageId: {
            type: String
        },
        roleUser: {
            type: String
        },
        userPost: {
            type: String
        },
        isImgProfile: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        },
        style: [{
            type: String
        }],
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Image', MySchema)