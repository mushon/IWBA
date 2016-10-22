import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Header } from '../components';
import { connect } from 'react-redux';
import { addTotalDrops } from '../actions';
import axios from 'axios';
import moment from 'moment';

class PourWater extends Component {
  constructor(props){
    super(props);
  }

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
    let dropsClassName = this.props.dropClassScale(this.props.dropletCount);

    return (
      <section className="pour-water">

        <Header />
        <div className="container">
          <ul className={`drops${dropsClassName}`}>
           {
            _.map(_.range(this.props.dropletCount), i => {
              return <li key={i}>💧</li>;
            })
          }
          </ul>

          {
            this.props.dropletCount > 0 ?
            <Link to="/3-congratulation" className="btn confirm">confirm</Link>
            : null
          }
        </div>

      </section>


    );
  }
}

let mapStateToProps = state => {
  return {
    dropletCount: state.dropletCount,
    dropClassScale: state.dropClassScale
  }
};


export default connect(mapStateToProps)(PourWater);
