const mongoose = require("mongoose")
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const uniqueValidator = require("mongoose-unique-validator")
const brcrypt = require("bcrypt")

const MySchema = Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String,
            // required: true
        },
        appRole: {
            type: String,
        },
        nickName: {
            type: String
        },
        genre: {
            type: String,
            // enum: ['Hombre', 'Mujer', 'Otro']
        },
        genderTatoo: [{
            type: String,
        }],
        imagesWork: [{
            type: ObjectId,
            ref: 'Image'
        }],
        imagesProfile: {
            type: String
        },
        imgSave: [{
            type: ObjectId,
            ref: 'SaveImage'
        }],
        codEmail: {
            type: String
        },
        codPassRecover: {
            type: String
        },
        forgetPassConfirm: {
            type: Boolean,
            default: false
        },
        emailConfirm: {
            type: Boolean,
            default: false
        },
        chats: [
            {
                type: ObjectId,
                ref: 'Chat',
            }
        ],
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

MySchema.plugin(uniqueValidator)

MySchema.methods.setPassword = async function (password) {
    const passwordHash = await brcrypt.hash(password, 7);
    this.password = passwordHash
    await this.save()
}

MySchema.methods.validPassword = function (password) {
    return brcrypt.compare(password, this.password)
}

module.exports = mongoose.model('Canva', MySchema)