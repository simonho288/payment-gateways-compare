# payment-gateways-compare

Compare three payment gateways (PayPal, Stripe, Braintree) in developer aspect. This project built using Node-ExpressJS as well as the NodeJS SDKs from three vendors.

This repo hosts the source codes which described in this [Blog post](https://blog.simonho.net/paypal-vs-braintree-vs-stripe-ux-sdk/)

## Run the project

### 1. Enter your payment gateway access keys
In project root, create a text file `.env` and fill in the accesskey values from your payment processors.
```yaml
PAYPAL_MODE=[sandbox|production]
PAYPAL_ACCOUNT_EMAIL=[classic paypal account email]
PAYPAL_CLIENT_ID='[Your PayPal Client Id]'
PAYPAL_CLIENT_SECRET='[Your PayPal Client Secret]'

BT_ENVIRONMENT=[Sandbox|Production]
BT_MERCHANT_ID='[Your Braintree Merchant ID]'
BT_PUBLIC_KEY='[Your Braintree public key]'
BT_PRIVATE_KEY='[Your Braintree private key]'

STRIPE_PUBLISH_KEY='[Your Stripe pubishable key]'
STRIPE_SECRET_KEY='[Your Stripe secret key]'
```

### 2. Server App Installation
```sh
npm install
```

### 3. Run the server App
```sh
npm start
```

### 4. Browse the server
Open your Chrome browser and browse: http://localhost:3000

# App Execution Description
Please refer to the [Blog post](https://blog.simonho.net/paypal-vs-braintree-vs-stripe-ux-sdk/)

---

MIT License (MIT)
=====================

Copyright © 2017, Simon Ho

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
