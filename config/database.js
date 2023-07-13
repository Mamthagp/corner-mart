const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const configDB = () => {
    mongoose.connect('mongodb://localhost:27017/corner-mart-fs')
        .then(() => {
            console.log('connected to db')
        })
        .catch(() => {
            console.log('error connected to db')
        })
}

module.exports = configDB