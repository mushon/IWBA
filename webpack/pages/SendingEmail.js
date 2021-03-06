import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import _ from 'lodash';
import { Header, SessionResetter } from '../components';
import { connect } from 'react-redux';
import { changeInvestorEmailAddress } from '../actions';
import axios from 'axios';

class SendingEmail extends Component {

  constructor(props){
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  componentDidMount(){

    this.refInput.focus();
  }

  componentWillUnmount(){

  }

  handleSubmit(e){
    e.preventDefault();
    
    let instance = axios.create({
      headers: {
        'X-CSRF-Token': this.props.authToken
      }
    })

    instance.post('/api/deposits/batch_create.json', {
      email: this.props.investorEmail,
      deposits: this.props.deposits
    })
    .then(function (response) {
      if (response.data.success) {



        hashHistory.push("/6-result");

        

      } else {
        console.log(response);
      }
    })
    .catch(function (error) {
      console.log(error);
    

    });

  

  }

  handleEmailChange(e){
    this.props.dispatch(changeInvestorEmailAddress(e.target.value));
  }

  render() {
    return (
      <section className="sending-email">

        <header>
          Your water investment account is all set.<br/>
          Where should we send your account details?
        </header>

        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <input ref={ c => { this.refInput = c; }} className="input-email" type="email" value={this.props.investorEmail} name="investorEmail" onChange={this.handleEmailChange} placeholder="your email here" />
            <input className="btn" type="submit" value="SUBMIT" /> 
          </form>
        </div>
        <SessionResetter />
      </section>


    );
  }
}

let mapStateToProps = state => {
  return {
    dropletCount: state.dropletCount,
    deposits: state.deposits,
    investorEmail: state.investorEmail,
    authToken: state.authToken,
    sessionResetter: state.sessionResetter
  }
};


export default connect(mapStateToProps)(SendingEmail);
