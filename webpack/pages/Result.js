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
    hashHistory.push("/1-start");
  }

  render() {
    return (
      <section className="result" onClick={this.handleReset}>

        <header>
          Thanks, we'll be in touch.<br/>
        </header>
        <div className="container">
        Take care and remember,<br/>
        every drop is counted!
          <div id="logo">
            IWBA
          </div>
        </div>

      </section>


    );
  }
}


export default connect()(Result);
