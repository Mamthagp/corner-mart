const Product = require('../models/product')

const productsCltr = {}

const productsList = (id, role) => {
    if(role === 'admin'){
        return Product.find()
    }else{
        return Product.find({_id : id})
    }
}

productsCltr.list = (req, res) => {
    const { id, role } = req.user
    productsList(id, role)
        .then((products) => {
            res.json(products)
        })
        .catch((err) => {
            res.json(err)
        })
        
}

productsCltr.create = (req, res) => {
    const body = req.body
    const product = new Product(body)
    product.save()
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}

productsCltr.show = (req, res) => {
    const id = req.params.id
    Product.findOne({_id : id, userId:req.user.id})
        .then((product) => {
            res.json(product)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports = productsCltr

