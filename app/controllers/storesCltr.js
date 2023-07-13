const Store = require('../models/store')

const storesCltr = {}

const storesList = (id, role) => {
    if(role === 'admin'){
        return Store.find()
    }else{
        return Store.find({_id : id})
    }
}

const deleteStore = (id, userId, role) => {
    if(role === 'admin'){
        return Store.findByIdAndDelete(id)
    }else{
        return Store.findOneAndDelete({_id : id, userId : userId})
    }
}

storesCltr.list = (req, res) => {
    const { id, role } = req.user
    storesList(id, role)
        .then((stores) => {
            res.json(stores)
        })
        .catch((err) => {
            res.json(err)
        })
}

storesCltr.create = (req, res) => {
    const body = req.body
    const store = new Store(body)
    store.save()
        .then((store) => {
            res.json(store)
        })
        .catch((err) => {
            res.json(err)
        })
}

storesCltr.show = (req, res) => {
    const id = req.params.id
    Store.findOne({_id : id, userId : req.user.id})
        .then((store) => {
            res.json(store)
        })
        .catch((err) => {
            res.json(err)
        })
}

storesCltr.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    const { id: userId, role} = req.user
    Store.findOneAndUpdate({_id: id, userId : userId}, body, {new : true, })
        .then((store) => {
            res.json(store)
        })
        .catch((err) => {
            res.json(err)
        })
}

storesCltr.destroy = (req, res) => {
    const id = req.params.id
    const { id: userId, role } = req.user
    console.log(id, userId, role)
    deleteStore(id, userId, role)
        .then((store) => {
            res.json(store)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = storesCltr