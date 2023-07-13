const jwt = require('jsonwebtoken')
const Resident = require('../models/resident')

const authenticateUser = function(req, res, next){
    let token = req.header('Authorization')
    if(token){
        token = token.split(' ')[1]
        try{
            const tokenData = jwt.verify(token, process.env.JWT_SECRET)
            req.user = tokenData
            next()
        }
        catch(e){
            res.status(400).json({
                errors : 'invalid token'
            })
        }
    }else{
        res.status(401).json({
            errors : 'token is required'
        })
    }
}

const authorisedUser = function(req, res, next){
    const { role } = req.user
    if(role === 'admin'){
        next()
    }else{
        res.status(403).json({
            errors : 'page you are looking for does not exist'
        })
    }
}

module.exports = {
    authenticateUser,
    authorisedUser
}

