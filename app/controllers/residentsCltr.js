const { findByIdAndDelete, findOneAndDelete } = require('../models/resident')
const Resident = require('../models/resident')

const residentsCltr = {}

// residentsCltr.list = (req, res) => {
//     Resident.find()
//         .then((residents) => {
//             res.json(residents)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

const residentList = (id, role) => {
    if(role === 'admin'){
        return Resident.find()
    }else{
        return Resident.find({ userId : id })
    }
}

const deleteResident = (id, userId, role) => {
    if(role === 'admin'){
        return Resident.findByIdAndDelete(id)
    }else{
        return Resident.findOneAndDelete({_id : id, userId : userId})
    }
}

const updateResident = (id, userId, role, body) => {
    if(role === 'admin'){
        return Resident.findByIdAndUpdate(id, body, {new : true, runValidators : true})
    }else{
        return Resident.findOneAndUpdate({_id : id, userId : userId}, body, {new : true, runValidators : true})
    }
}

residentsCltr.list = (req, res) => {
    const { id, role } = req.user
    residentList(id, role)
        .then((residents) => {
            res.json(residents)
        })
        .catch((err) => {
            res.json(err)
        })
}

residentsCltr.create = (req, res) => {
    const body = req.body
    const resident = new Resident(body)
    resident.save()
        .then((resident) => {
            res.json(resident)
        })
        .catch((err) => {
            res.json(err)
        })
}

residentsCltr.show = (req, res) => {
    const id = req.params.id
    Resident.findOne({_id : id, userId : req.user.id})
        .then((resident) => {
            res.json(resident)
        })
        .catch((err) => {
            res.json(err)
        })
}

residentsCltr.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    const { id:userId, role} = req.user
    updateResident(id, userId, role, body)
        .then((resident) => {
            res.json(resident)
        })
        .catch((err) => {
            res.json(err)
        })
}

residentsCltr.delete = (req, res) => {
    const id = req.params.id
    const { id : userId, role } = req.user
    deleteResident(id, userId, role)
        .then((resident) => {
            res.json(resident)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = residentsCltr