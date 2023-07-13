require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3060
const configDB = require('./config/database')
const routes = require('./config/routes')

app.use(express.json())
app.use(cors())
configDB()
app.use('/', routes)

app.listen(PORT, () => {
    console.log('server running on', PORT)
})