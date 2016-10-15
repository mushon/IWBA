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
    setTimeout(this.handleReset, 3000);
  }

  handleReset(e){
    this.props.dispatch(commitReset());
    hashHistory.push("/1-start");
  }

  render() {
    return (
      <section className="result" onClick={this.handleReset}>

        <div>
          Thanks, we'll be in touch.<br/>
          Take care and remember, every drop is counted!
        </div>
        <div className="container">
          IWBA
        </div>

      </section>


    );
  }
}


export default connect()(Result);