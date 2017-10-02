const express = require('express')
const router = express.Router()
const logger = require('winston-color')
const paypal = require('paypal-rest-sdk')
const dotenv = require('dotenv')

dotenv.config() // load environment variables from .env file

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
	next()
})

// define the home page route
router.get('/', function (req, res) {
	let opts = {
		pretty: true,
		mode: process.env.PAYPAL_MODE
	}
	res.render('./paypal/home.pug', opts)
})

// Form post by sandbox-express-checkout.pug
router.post('/submit', (req, res) => {
	logger.debug('app.js: /submit')
	
	let description = req.body.description ?
		req.body.description : 'This is the payment description'
	let host = req.protocol + '://' + req.get('host')
	let createPaymentJson = {
		intent: "sale", // authorize
		payer: {
			payment_method: "paypal"
		},
		redirect_urls: {
			return_url: host + '/paypal_return', // see above route
			cancel_url: host + '/payment_cancel' // see above route
		},
		transactions: [{
			item_list: {
				items: [{
					name: "item 1",
					sku: "item_01",
					price: "0.1",
					currency: "USD",
					quantity: 1
				}]
			},
			amount: {
				currency: "USD",
				total: "0.1"
			},
			description: description
		}]
	}
	paypal.payment.create(createPaymentJson, (err, payment) => {
		if (err) {
			logger.error(err.response.error_description)
			throw err
		} else {
			console.log("Create Payment response...")
			console.log(payment)
			let redirectUrl
			payment.links.forEach((link) => {
				if (link.method === 'REDIRECT') {
					redirectUrl = link.href
				}
			})
			if (redirectUrl) {
				res.status(200).redirect(redirectUrl)
			} else {
				logger.error('Cannot find redirect url from paypal payment result!')
			}
		}
	})
})

module.exports = router