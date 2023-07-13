const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const { Schema } = mongoose

const storeSchema = new Schema({
    name : {
        type : String,
        required  :true,
        unique : true
    },
    contact : {
        type : Number,
        required : true,
        unique : true
    },
    timing : {
        type : String,
        required : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, {timestamps : true})

storeSchema.plugin(uniqueValidator)

const Store = mongoose.model('Store', storeSchema)

module.exports = Store