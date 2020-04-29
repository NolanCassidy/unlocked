import React, { Component } from "react";
import { auth } from "../services/firebase";

export default class PayButton extends Component {
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
      amount: 2000,
      name: 'Full Access',
      description: 'Access Month One At Home Workouts',
      image: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/320/facebook/65/flexed-biceps_emoji-modifier-fitzpatrick-type-4_1f4aa-1f3fd_1f3fd.png',
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
