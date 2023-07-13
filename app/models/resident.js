const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose

const residentSchema = new Schema({
    name : {
        type : String,
        required : [true, 'name is required'],
        unique : true
    },
    mobile : {
        type : Number,
        required : [true, 'mobile number is required'],
        unique : true
    },
    block : {
        type : String,
        required : [true, 'block is required']
    },
    doorNumber : {
        type : String,
        required : [true, 'door number is required']
    },
    isApproved : {
        type : Boolean,
        default : false,
        required : true
    },
    residentType : {
        type : String,
        required : true,
        enum : ['owner', 'rent']
    }, 
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
}, { timestamps : true })

residentSchema.plugin(uniqueValidator)

const Resident = mongoose.model('Resident', residentSchema)

module.exports = Resident