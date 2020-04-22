import React, { Component } from "react";
import Header from "../components/Header";

export default class Public extends Component {
  render() {
    return (
      <div>
        <Header />

        <h4 className="chat-num">This is a public page for anyone not signed in!</h4>

      </div>
    );
  }
}
