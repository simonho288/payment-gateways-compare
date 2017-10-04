'use strict'

const express = require('express')
const router = express.Router()
const logger = require('winston-color')
const STRIPE = require('stripe')
const dotenv = require('dotenv')
const path = require('path')
const pug = require('pug')
const fs = require('fs')

dotenv.config() // load environment variables from .env file

// Setup stripe with Publishable Key in .env
const stripe = STRIPE(process.env.STRIPE_SECRET_KEY)
const CHARGE_AMOUNT = 1

// middleware that is specific to this router
router.use((req, res, next) => {
	next()
})

// define the home page route
router.get('/', function(req, res) {
	let opts = {
		accessKey: process.env.STRIPE_PUBLISH_KEY,
		amount: (CHARGE_AMOUNT * 100).toString(),
		pretty: true
	}
	res.render('./stripe/home.pug', opts)
})

router.get('/charge/:token', (req, res) => {
  let token = req.params.token
  console.assert(token)
  const amount = CHARGE_AMOUNT * 100
  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: token,
    description: 'Stripe experiment testing charge'
  }, (err, charge) => {
    if (err) {
      res.redirect('/stripe/payment-failure?err_msg=' + err.message)
    } else {
			console.log('charge', charge)
			if (charge.outcome && charge.outcome.risk_level != 'normal') {
	      res.redirect('/stripe/payment-warning?charge_id=' + charge.id + '&msg=' + charge.outcome.seller_message)
			} else {
	      res.redirect('/stripe/payment-success/' + charge.id)
			}
    }
  })
})

router.post('/charge', (req, res) => {
  let token = req.body.stripeToken
  console.assert(token)
  const amount = CHARGE_AMOUNT * 100
  stripe.charges.create({
    amount: amount,
    currency: 'usd',
    source: token,
    description: 'Stripe experiment testing charge'
  }, (err, charge) => {
    if (err) {
      res.redirect('/stripe/payment-failure?err_msg=' + err.message)
    } else {
      console.log('Charged successful')
			console.log('charge', charge)
      res.redirect('/stripe/payment-success/' + charge.id)
    }
  })
})

router.get('/payment-success/:charge_id', (req, res) => {
	let opts = {
		charge_id: req.params.charge_id,
		pretty: true
	}
  res.render('./stripe/payment-success.pug', opts)
})

router.get('/payment-failure', (req, res) => {
	let opts = {
		pretty: true,
		err_msg: req.query.err_msg
	}
	res.render('./stripe/payment-failure.pug', opts)
})

router.get('/payment-warning', (req, res) => {
	let opts = {
		pretty: true,
		charge_id: req.query.charge_id,
		msg: req.query.msg
	}
	res.render('./stripe/payment-warning.pug', opts)
})

module.exports = router