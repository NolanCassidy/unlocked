import React, { Component } from "react";
import { auth } from "../services/firebase";

export default class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser
    };

  }

  componentDidMount() {
    // Publishable Key from Stripe Dashboard
    const stripe = window.Stripe('pk_test_7xmxzxXbJoooFCEtfJDQsOry00qnD6ZdV6');
    const paymentBtn = document.getElementById('stripe-payment-btn');
    let sessionId;
    paymentBtn.addEventListener('click', () => {
      let orderData = {
      currency: 'USD',
      quantity: 1,
      amount: 500,
      name: 'Full Access',
      description: 'One time payment to access the whole website!',
      image: 'https://img.icons8.com/pastel-glyph/2x/lock.png',
      customerEmail: this.state.user.email,
      clientId: this.state.user.uid
    }
    // Url to Firebase function
    fetch('https://us-central1-auth-a8c9d.cloudfunctions.net/createOrderAndSession', {
      method: 'POST',
      // Adding the order data to payload
      body: JSON.stringify(orderData)
      }).then(response => {
        return response.json();
      }).then(data => {
        // Getting the session id from firebase function
        var body = JSON.parse(data.body);
        return sessionId = body.sessionId;
      }).then(sessionId => {
        // Redirecting to payment form page
        stripe.redirectToCheckout({
          sessionId: sessionId
        }).then(function (result) {
          //console.log(result.error.message);
        });
      });
    });
  }

  render() {
    return (
      <div>
        <button className="btn btn-submit" id='stripe-payment-btn'>Buy Full Access</button>
      </div>
    );
  }
}
