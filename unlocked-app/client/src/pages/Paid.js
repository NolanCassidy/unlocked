import React, { Component } from "react";
import Header from "../components/Header";
import Purchase from "../components/Purchase";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Paid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      paid: false,
      loadingProfile: false
    };

  }

async componentDidMount() {
    this.setState({lodaingProfile: true });
    try {
      db.ref("paid/"+this.state.user.uid).on("value", snapshot => {
        let paid = false;
        try{paid = snapshot.val().paid;}catch(error){db.ref("paid/"+this.state.user.uid).set({
          paid: false,
          timestamp: Date.now(),
        });}
        this.setState({ paid });
        this.setState({ lodaingProfile: false });
    });
    } catch (error) {
      this.setState({ lodaingProfile: false });
    }
  }

  render() {
    return (
      <div>
        <Header />

        {this.state.loadingProfile ? <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div> : ""}

         <Purchase paid={this.state.paid} />

        <div className="py-2 mx-3">
          Login in as: <strong className="text-info">{this.state.user.email}</strong>
        </div>
      </div>
    );
  }
}
