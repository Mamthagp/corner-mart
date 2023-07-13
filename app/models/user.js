const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')
const isEmail = require('validator/lib/isEmail')
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const { Schema } = mongoose

const userSchema = new Schema({
    username : {
        type : String,
        required : [true, 'name is required']
    },
    email : {
        type : String,
        required : [true, 'email is required'],
        unique : true,
        validate : {
            validator : function(value){
                return isEmail(value)
            },
            message : function(){
                return 'invalid email format'
            }
        }
    },
    password : {
        type : String,
        minlength : 8,
        maxlength : 16,
        validate : {
            validator : function(value){
                return passwordFormat.test(value)
            },
            message : function(){
                return 'password should consists of 1 capital letter, 1 digit, 1 special char'
            }
        }
    },
    role : {
        type : String,
        required : true,
        default : 'resident',
        enum : ['admin', 'resident', 'store']
    }
}, { timestamps : true })

userSchema.plugin(uniqueValidator)

userSchema.pre('save', function(next){
    bcrypt.genSalt()
        .then((salt) => {
            bcrypt.hash(this.password, salt)
                .then((encrypted) => {
                    this.password = encrypted
                    next()
                })
                .catch((err) => {
                    res.json({
                        errors : 'error generating encrypted'
                    })
                })
        })
        .catch((err) => {
            res.json({
                errors : 'error generating salt'
            })
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User