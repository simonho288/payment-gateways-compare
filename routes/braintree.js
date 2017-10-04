'use strict'

const express = require('express')
const router = express.Router()
const logger = require('winston-color')
const braintree = require('braintree')
const dotenv = require('dotenv')

dotenv.config() // load environment variables from .env file

let environment = process.env.BT_ENVIRONMENT.charAt(0).toUpperCase() + process.env.BT_ENVIRONMENT.slice(1)

let gateway = braintree.connect({
  environment: braintree.Environment[environment],
  merchantId: process.env.BT_MERCHANT_ID,
  publicKey: process.env.BT_PUBLIC_KEY,
  privateKey: process.env.BT_PRIVATE_KEY
})

const TRANSACTION_SUCCESS_STATUSES = [
  braintree.Transaction.Status.Authorizing,
  braintree.Transaction.Status.Authorized,
  braintree.Transaction.Status.Settled,
  braintree.Transaction.Status.Settling,
  braintree.Transaction.Status.SettlementConfirmed,
  braintree.Transaction.Status.SettlementPending,
  braintree.Transaction.Status.SubmittedForSettlement
]

// middleware that is specific to this router
router.use((req, res, next) => {
	next()
})

// define the home page route
router.get('/', (req, res) => {
	gateway.clientToken.generate({}, (err, response) => {
		let opts = {
			clientToken: response.clientToken,
			mode: process.env.BT_ENVIRONMENT
		}
		res.render('./braintree/home.pug', opts)
	})
})

// Form post by sandbox-express-checkout.pug
router.post('/submit', (req, res) => {
	logger.debug('app.js: /submit')

	let transactionErrors
	let amount = req.body.amount // In production you should not take amounts directly from clients
	let nonce = req.body.payment_method_nonce

	gateway.transaction.sale({
		amount: amount,
		paymentMethodNonce: nonce,
		options: {
			submitForSettlement: true
		}
	}, (err, result) => {
		logger.debug(result)
		if (result.success) {
			res.redirect('payment-success/' + result.transaction.id)
		} else {
			logger.error(result.message)
			// transactionErrors = result.errors.deepErrors()
			// req.flash('error', { msg: result.message })
			res.redirect('payment-failure?err_msg=' + result.message)
		}
	})
})

router.get('/payment-success/:txn_id', (req, res) => {
	let opts = {
		txn_id: req.params.txn_id,
		pretty: true
	}
  res.render('./braintree/payment-success.pug', opts)
})

router.get('/payment-failure', (req, res) => {
	let opts = {
		pretty: true,
		err_msg: req.query.err_msg
	}
	res.render('./braintree/payment-failure.pug', opts)
})


module.exports = router