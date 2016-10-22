import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import { Header } from '../components';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { addTotalDrops } from '../actions';

class Start extends Component {
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

  componentWillReceiveProps(newProps){
    if (newProps.dropletCount > 0) {
      hashHistory.push("2-pour-water");
    }
  }


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

let mapStateToProps = state => {
  return {
    dropletCount: state.dropletCount
  }
};

export default connect(mapStateToProps)(Start);
