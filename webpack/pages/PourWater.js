import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Header } from '../components';
import { connect } from 'react-redux';
import { addTotalDrops } from '../actions';
import axios from 'axios';
import moment from 'moment';

class PourWater extends Component {
  componentDidMount(){
    this.pourWaterStageTime = moment();
    clearInterval(this.downTimer);
    this.downTimer = setInterval(() =>{
      axios.get(`/api/drops/latest.json?pour_water_stage_time=${this.pourWaterStageTime.toISOString()}`)
        .then(response => {
          this.props.dispatch(addTotalDrops(response.data.drops));
        })
        .catch(function (error) {
          console.log(error);
        });

    }, 1000);

  }

  componentWillUnmount(){
    clearInterval(this.downTimer);
  }

  render() {
    return (
      <section className="pour-water">

        <Header />
        <div className="container">
           { 
            _.map(_.range(this.props.dropletCount), i => {
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
    dropletCount: state.dropletCount
  }
};


export default connect(mapStateToProps)(PourWater);