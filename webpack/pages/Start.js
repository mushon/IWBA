import React, { Component } from 'react';
import { Link } from 'react-router';
import { Header } from '../components';

class Start extends Component {
  render() {
    return (
      <section className="start">

        <Header />
        <div className="container">
          Your water <br/>
          Investment Portfolio <br/>
          Starts Here:

          <Link to="/2-pour-water">💧</Link>
        </div>

      </section>

    );
  }
}

export default Start;
