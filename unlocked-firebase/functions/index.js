const functions = require('firebase-functions');
// We should install required packages (stripe, body-parser) using npm install inside /functions/ folder
const bodyParser = require('body-parser');
const cors = require('cors')({origin: true});
const express = require('express');
// Secret Key from Stripe Dashboard
const stripe = require('stripe')('sk_test_RKUjuTu5vkFhyfgPP4uWbSr100h1lM3aEC');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

// The function for sending responses
function send(res, code, body) {
  res.send({
    statusCode: code,
    headers: {'Access-Control-Allow-Origin': '*'},
    body: JSON.stringify(body),
  });
}
// Our app has to use express
const createOrderAndSessionApp = express();
// Our app has to use cors
createOrderAndSessionApp.use(cors);
// The function that get data from front-end and create a payment session
function createOrderAndSession(req, res) {
  const body = JSON.parse(req.body);
  // Creating session data from payload
  const currency = body.currency;
  const quantity = body.quantity;
  const amount = body.amount;
  const name = body.name;
  const description = body.description;
  let images = [];
  images[0] = body.image;
  const customerEmail = body.customerEmail;
  const clientId = body.clientId;
  // Also we can process the order data, e.g. save it to firebase database
  // Creating session using the data above
  stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: name,
      description: description,
      images: images,
      amount: amount,
      currency: currency,
      quantity: quantity,
    }],
    client_reference_id: clientId,
    customer_email: customerEmail,
    // We will add the only app page for simplicity
    success_url: 'http://localhost:3000/paid/',
    cancel_url: 'http://localhost:3000/free/',
  }).then(session => {
  // Getting the session id
  var sessionId = session.id;
  // Here we can do something with the session id, e.g. add it to the order data in firebase database
  // Sending the session id to front-end
  send(res, 200, {
    sessionId: sessionId
  });
  return;
  }).catch(error => {
    console.log(error);
    return;
  });
}
// Creating a route
createOrderAndSessionApp.post('/', (req, res) => {
  try {
    createOrderAndSession(req, res);
  } catch(e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});
// Exporting our http function
exports.createOrderAndSession = functions.https.onRequest(createOrderAndSessionApp);

// We have to add the webhook function to Stripe Dashboard, add the checkout.session.completed there and get endpointSecret
const endpointSecret = 'whsec_N8SVZfepHwQSKslMYfxJlrvP61IkDPVp';
// Our app has to use express
const processTheOrderApp = express();
processTheOrderApp.post('/', bodyParser.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, endpointSecret);
  } catch (err) {
    console.log(err);
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // Here we can proccess the order data after successfull payment
    // (e.g. change payment status in Firebase Database and call another function)
    admin.database().ref('/paid').child(session.client_reference_id).set({paid:true, timestamp:Date.now()});
  }
  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});
// Exporting our http function
exports.processTheOrder = functions.https.onRequest(processTheOrderApp);
