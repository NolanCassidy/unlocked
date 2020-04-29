import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import PayButton from "../components/PayButton";

export default class Paid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      paid: null,
      loadingProfile: false,
      loaded: null
    };

  }

async componentDidMount() {
    this.setState({lodaingProfile: true });
    try {
      await db.ref("paid/"+this.state.user.uid).on("value", snapshot => {
        let paid = null;
        if(snapshot.exists()){
          paid = snapshot.val().paid;
        }else{
          db.ref("paid/"+this.state.user.uid).set({
            paid: false,
            timestamp: Date.now(),
          });
        }
        this.setState({ paid });
        this.setState({ lodaingProfile: false });
        this.setState({ loaded:true });
    });
    } catch (error) {
      this.setState({ lodaingProfile: false });
    }
  }

  render() {
    if (!this.state.paid) {
      return(<div>{this.state.loaded===null ? <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div> : <div><Header /><div className="chat-num"><PayButton /></div></div>}</div>);
    }
    return (
      <div>
        <Header />
        <p className="chat-num">You have paid!</p>

      </div>
    );
  }
}
