const express = require('express')
const router = express.Router()
const logger = require('winston-color')
const paypal = require('paypal-rest-sdk')
const dotenv = require('dotenv')

dotenv.config() // load environment variables from .env file

paypal.configure({
	mode: process.env.PAYPAL_MODE,
	client_id: process.env.PAYPAL_CLIENT_ID,
	client_secret: process.env.PAYPAL_CLIENT_SECRET
})

// middleware that is specific to this router
router.use((req, res, next) => {
	next()
})

// define the home page route
router.get('/', (req, res) => {
	let opts = {
		pretty: true,
		mode: process.env.PAYPAL_MODE
	}
	res.render('./paypal/home.pug', opts)
})

router.get('/payment-return', (req, res) => {
	let opts = {
		pretty: true,
		paymentId: 	req.query.paymentId,
		token: req.query.token,
		PayerID: req.query.PayerID
	}
	res.render('./paypal/payment-return.pug', opts)
})

router.get('/payment-cancel', (req, res) => {
	let opts = {
		pretty: true,
		token: req.query.token
	}
	res.render('./paypal/payment-cancel.pug', opts)
})

router.post('/submit', (req, res) => {	
	let description = req.body.description ? req.body.description : 'This is the payment description'
	let amount = req.body.amount
	let host = req.protocol + '://' + req.get('host')
	let createPaymentJson = {
		intent: "sale", // authorize
		payer: {
			payment_method: "paypal"
		},
		redirect_urls: {
			return_url: host + '/paypal/payment-return',
			cancel_url: host + '/paypal/payment-cancel'
		},
		transactions: [{
			item_list: {
				items: [{
					name: "item 1",
					sku: "item_1",
					price: amount,
					currency: "USD",
					quantity: 1
				}]
			},
			amount: {
				currency: "USD",
				total: amount
			},
			description: description
		}]
	}
	// Call PayPal to process the payment
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