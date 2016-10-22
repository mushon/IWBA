import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router';
import _ from 'lodash';
import { Header } from '../components';
import { connect } from 'react-redux';

class Congratulation extends Component {
  onClick(e){
    hashHistory.push("/4-map-invest");
  }

  render() {
    return (

        <section className="congratulation" onClick={this.onClick.bind(this)}>

          <header>
            <Link to="/4-map-invest">
            Congratulations!<br/>
            You deposited <strong>{ this.props.dropletCount }</strong> drops
            </Link>
          </header>
          <div className="container">
            <ul className="drops small">
            {
              _.map(_.range(this.props.dropletCount), i => {
                return <li key={i}>💧</li>;
              })
            }
            </ul>
          </div>

        </section>


    );
  }
}

let mapStateToProps = state => {
  return {
    dropletCount: state.dropletCount
  }
};


export default connect(mapStateToProps)(Congratulation);
