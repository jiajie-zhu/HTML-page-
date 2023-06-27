'use restrict'
const express = require('express')
const app = express()
var path = require('path');  
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const router = require('./routes')
app.use('/static', express.static('public'))
app.use(router)
app.use(express.static(path.join(__dirname, 'public')))
// Use swagger-autogen to generate API document and serve with swagger
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))


// app.use((req, res, next) => {
//   res.status(404).send("Sorry can't find that!")
// })

module.exports = app
