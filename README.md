# payment-gateways-compare

Compare three payment gateways (PayPal, Stripe, Braintree) in developer aspect. This project built using Node-ExpressJS as well as the NodeJS SDKs from three vendors.

## Run the project

### 1. Fill in the access keys
In project root, create a text file `.env` and fill in the accesskey values from your payment processors.
```yaml
PAYPAL_MODE=[sandbox|production]
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
Please refer to the [Blog post](https://blog.simonho.net/comparing-the-ux-of-three-payment-processors-using-nodejs-sdks-paypal-vs-braintree-vs-stripe/)
