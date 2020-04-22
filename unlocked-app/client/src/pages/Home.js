import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="vh-100 jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
            <img src={logo} className="App-logo" alt="logo" />
              <p></p>
              <h1 className="display-4">Unlocked</h1>

              <div className="mt-4">
                <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                <Link className="btn px-5" to="/login">Login to Your Account</Link>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    )
  }
}
