import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";

export default class Free extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser
    };

  }

  render() {
    return (
      <div>
        <Header />

        <h4 className="chat-num">This is a free page for users.</h4>

        <div className="py-2 mx-3">
          Login in as: <strong className="text-info">{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}
