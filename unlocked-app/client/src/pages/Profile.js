import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      profile: {
        nickname: '',
      },
      oldnickname: '',
      paid: false,
      submitting: false,
      readError: null,
      writeError: null,
      loadingProfile: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null, lodaingProfile: true });
    try {
      await db.ref("profile/"+this.state.user.uid).on("value", snapshot => {
        let oldnickname = null;
        //console.log(snapshot.val().nickname)
        try{oldnickname = snapshot.val().nickname;}catch(error){db.ref("profile/"+this.state.user.uid).set({
          uid: this.state.user.uid,
          nickname: this.state.user.email,
          lastupdate: Date.now(),
        });}
        this.setState({ oldnickname });
      });

      await db.ref("paid/"+this.state.user.uid).on("value", snapshot => {
        let paid = false;
        try{paid = snapshot.val().paid;}catch(error){db.ref("paid/"+this.state.user.uid).set({
          paid: false,
          timestamp: Date.now(),
        });}
        this.setState({ paid });
      });
      this.setState({ lodaingProfile: false });
    } catch (error) {
      this.setState({ readError: error.message, lodaingProfile: false });
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    try {
      await db.ref("profile/"+this.state.user.uid).set({
        uid: this.state.user.uid,
        nickname: this.state.profile.nickname,
        lastupdate: Date.now(),
      });
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  onHandleChange(event) {
    const name = event.target.getAttribute('name');
    this.setState({
      profile: { ...this.state.profile, [name]: event.target.value }
    });
  }

  render() {
    return (
      <div>
        <Header />

        <div className="chat-area" ref={this.myRef}>

        {this.state.loadingProfile ? <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div> : ""}

        <p>Login in as: <strong className="text-info">{this.state.user.email}</strong></p>
        <p>Nickname: <strong className="text-info">{this.state.oldnickname}</strong></p>
        <p>Paid: <strong className="text-info">{this.state.paid.toString()}</strong></p>

        <h4>Update</h4>

        <form
          onSubmit={this.onSubmit}
          className="mx-3"
        >

          <div>


            <input
              className="prof-control"
              name="nickname"
              id="nickname"
              value={this.state.profile.nickname}
              onChange={this.onHandleChange}
            />

          </div>

          <button type="submit" className="btn btn-submit profbut ">
            Nickname
          </button>

        </form>

        </div>

      </div>

    );
  }
}
