import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Header } from '../components';
import { connect } from 'react-redux';

class Congratulation extends Component {
  render() {
    return (
      <Link to="/4-map-invest">
        <section className="congratulation">

          <div>
            Congratulations!<br/>
            You deposited { this.props.dropletCount } drops
          </div>
          <div className="container">
            { 
              _.map(_.range(this.props.dropletCount), i => {
                return <span key={i}>💧</span>;
              }) 
            }
          </div>

        </section>
      </Link>


    );
  }
}

let mapStateToProps = state => {
  return {
    dropletCount: state.dropletCount
  }
};


export default connect(mapStateToProps)(Congratulation);