const mongoose = require('mongoose')
const { Schema } = mongoose
const { ObjectId } = Schema.Types

const MySchema = Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    gender: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Products', MySchema)