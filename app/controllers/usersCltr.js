const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const usersCltr = {}

usersCltr.register = (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

usersCltr.login = (req, res) => {
    const body = req.body
    User.findOne({email : body.email})
        .then((user) => {
            if(user){
                bcrypt.compare(body.password, user.password)
                    .then((match) => {
                        if(match){
                            const tokenData = {
                                id : user._id,
                                role : user.role
                            } 
                            const token = jwt.sign(tokenData, process.env['JWT_SECRET'], { expiresIn : '10h' })
                            res.json({
                                token : `Bearer ${token}`
                            })

                        }else{
                            res.status(401).json({
                                errors : 'invalid email or password'
                            })
                        }
                    })
            }else{
                res.status(401).json({
                    errors : 'invalid email or password'
                })
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

// account
usersCltr.account = (req, res) => {
    const { id, role } = req.user
    User.findOne({_id : id})
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            res.json(err)
        })
}

// list of all the users both residents and shopkeepers
usersCltr.list = (req, res) => {
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = usersCltr