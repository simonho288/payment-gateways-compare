'use strict'

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('winston-color')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

let app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({
	secret: 'simonho288-secret',
	saveUninitialized: true,
	resave: true
}))

// Load the route modules
app.use('/paypal', require('./routes/paypal'))
app.use('/braintree', require('./routes/braintree'))

// Home page
app.get('/', (req, res) => {
	res.render('index.pug', { pretty: true })
})

app.listen(3000, () => {
	console.log('Server App listening on port 3000')
})
