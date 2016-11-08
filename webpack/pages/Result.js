import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import _ from 'lodash';
import { Header } from '../components';
import { connect } from 'react-redux';
import { commitReset } from '../actions';

class Result extends Component {
  constructor(props){
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount(){
    setTimeout(this.handleReset, 10000);
  }

  handleReset(e){
    this.props.dispatch(commitReset());
    document.location.href="/";
  }

  render() {
    return (
      <section className="result" onClick={this.handleReset}>

        <header>
          <br/>
          Thanks, we will be in touch…
        </header>
        <div className="container">
        <span>(check your spam folder)</span>
        <br/>
        <br/>
        <br/>
        and remember,<br/>
        tomorrow's drought is today's opportunity!

          <div id="logo">
            IWBA
          </div>
        </div>

      </section>


    );
  }
}


export default connect()(Result);
