const express = require('express')
const residentsCltr = require('../app/controllers/residentsCltr')
const router = express.Router()
const usersCltr = require('../app/controllers/usersCltr')
const storesCltr = require('../app/controllers/storesCltr')
const productsCltr = require('../app/controllers/productsCltr')
const { authenticateUser, authorisedUser } = require('../app/middlewares/authenticate')

// REGISTER, LOGIN, ACCOUNT, ALL USERS LIST
router.post('/api/users/register', usersCltr.register)
router.post('/api/users/login', usersCltr.login)
router.get('/api/users/account', authenticateUser, usersCltr.account)
router.get('/api/users', authenticateUser, authorisedUser, usersCltr.list)

// CRUD FOR RESIDENT
router.get('/api/residents', authenticateUser, residentsCltr.list)
router.post('/api/residents', authenticateUser, residentsCltr.create)
router.get('/api/residents/:id', authenticateUser, residentsCltr.show)
router.put('/api/residents/:id', authenticateUser, residentsCltr.update)
router.delete('/api/residents/:id', authenticateUser, residentsCltr.delete)

// CRUD FOR STORE
router.get('/api/stores', authenticateUser, storesCltr.list)
router.post('/api/stores', authenticateUser, storesCltr.create)
router.get('/api/stores/:id', authenticateUser, storesCltr.show)
router.put('/api/stores/:id', authenticateUser, storesCltr.update)
router.delete('/api/stores/:id', authenticateUser, storesCltr.destroy)

// CRUD FOR PRODUCT
router.get('/api/products', authenticateUser, productsCltr.list)
router.post('/api/products', authenticateUser, productsCltr.create)
router.get('/api/products/:id', authenticateUser, productsCltr.show)
// router.put('/api/products/:id', authenticateUser, productsCltr.update)
// router.delete('/api/products/:id', authenticateUser, productsCltr.destroy)

module.exports = router