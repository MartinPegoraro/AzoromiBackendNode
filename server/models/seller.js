const mongoose = require("mongoose")
const { Schema } = mongoose
const { ObjectId } = Schema.Types

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
        nickName: {
            type: String
        },
        genre: {
            type: String,
            enum: ['Hombre', 'Mujer', 'Otro']
        },
        genderTatoo: [{
            type: String
        }],
        imagesWork: {
            type: Array,
            // default: 'https://logiabarcelona.com/wp-content/uploads/2018/12/tatuaje_realismo_brujula_brazo_Logia_Barcelona_Eduar_Cardona.jpg'
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

module.exports = mongoose.model('Sellers', MySchema)