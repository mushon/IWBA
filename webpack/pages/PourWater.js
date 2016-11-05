import React, { Component } from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import { Header, SessionResetter } from '../components';
import { connect } from 'react-redux';
import { addTotalDrops, changeSessionResetter } from '../actions';
import axios from 'axios';
import moment from 'moment';

class PourWater extends Component {
  constructor(props){
    super(props);

    this.state = {
      animDropletCount: 0
    };
  }

  componentDidMount(){
    this.setAnim(this.props);
  }

  componentWillReceiveProps(newProps){
    this.setAnim(newProps);
  }

  componentDidMount(){
    this.setAnim(this.props);
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
    clearInterval(this.intervalID);
  }


  setAnim(props){


    this.intervalID = clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      if (this.state.animDropletCount < props.dropletCount) {
        this.props.dispatch(changeSessionResetter({
          startedToPopupSeconds: 0,
          afterPopupResetSessionSeconds: 0
        }));
        this.setState({
          animDropletCount: this.state.animDropletCount + 2
        });  

      } else {
        clearInterval(this.intervalID);
      }
    }, 1);
  }

  render() {
    let dropsClassName = this.props.dropClassScale(this.props.dropletCount);

    return (
      <section className="pour-water">

        <Header />
        <div className="container">
          <ul className={`drops${dropsClassName}`}>
            {
              _.map(_.range(this.state.animDropletCount), i => {
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
        <SessionResetter />
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
