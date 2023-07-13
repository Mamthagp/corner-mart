const mongoose = require('mongoose')

const { Schema } = mongoose

const productSchema = new Schema({
    name : {
        type: String,
        required : [true, 'name is required']
    },
    price : {
        type : Number,
        required : [true, 'price is required'],
        min : 1 
    },
    inStock : {
        type : Boolean,
        required : true,
        default : true
    },
    store : {
        type : Schema.Types.ObjectId,
        ref : 'Store',
        required : true,
    },
    units : {
        type : String,
        required : true,
        enum : ['kgs', 'grams', 'ltr', 'piece', 'dozen', 'meter', 'pack']
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product