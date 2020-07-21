const express = require('express')
const bodyParser = require('body-parser')
const projectsRoutes = require('./Routes/projectsRoutes')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()

mongoose.connect(`mongodb+srv://${process.env.USERMGDB}:${process.env.PASSMGDB}@${process.env.SERVERMGDB}/${process.env.BDMGDB}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*')
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
   next()
})

app.use('/projects', projectsRoutes)
module.exports = app