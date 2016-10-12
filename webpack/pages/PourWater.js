import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Header } from '../components';
import { connect } from 'react-redux';

class PourWater extends Component {
  render() {
    return (
      <section className="pour-water">

        <Header />
        <div className="container">
           { 
            _.map(_.range(this.props.droplets), i => {
              return <span key={i}>💧</span>;
            }) 
          }

          <Link to="/3-congratulation">confirm</Link>
        </div>

      </section>


    );
  }
}

let mapStateToProps = state => {
  return {
    droplets: state.droplets
  }
};


export default connect(mapStateToProps)(PourWater);