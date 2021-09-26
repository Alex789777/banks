const {Schema, model} = require('mongoose')

const schema = new Schema({
    name: {
        type: String,
        required: false
    },
    rate: {
        type: Number,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    min: {
        type: Number,
        required: false
    },
    term: {
        type: Number,
        required: false
    },
    initloan: {
        type: Number,
        required: false
    },
    initpay: {
        type: Number,
        required: false
    },
    monthpay: {
        type: Number,
        required: false
    },
})

module.exports = model('Bank', schema)