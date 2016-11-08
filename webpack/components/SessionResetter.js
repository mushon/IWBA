import React, { Component } from 'react';
import { changeSessionResetter, commitReset } from '../actions';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import $ from 'jquery';

class SessionResetter extends Component {
  constructor(props){
    super(props);

    this.popLimit = 30000;
    this.resetLimit = 10000;
    this.resetTime = this.resetTime.bind(this);

    this.startedPopupInterval = null;
  }
  componentDidMount(){
    $('body').on("mousemove", this.resetTime);
    $(window).on("click", this.resetTime);
    $(window).on("touchstart", this.resetTime);
    $(window).on("touchmove", this.resetTime);
    $(window).on("touchend", this.resetTime);
    $(window).on("mousedown", this.resetTime);
    $(window).on("mouseup", this.resetTime);

    this.startedPopupInterval = setInterval(() => {
      // console.log(this.props.sessionResetter.startedToPopupSeconds);
      if (this.props.sessionResetter.startedToPopupSeconds <= this.popLimit - 1000) {
        this.props.dispatch(changeSessionResetter({
          startedToPopupSeconds: this.props.sessionResetter.startedToPopupSeconds + 1000,
          afterPopupResetSessionSeconds: this.props.sessionResetter.afterPopupResetSessionSeconds
        }));
      } else {
        this.props.dispatch(changeSessionResetter({
          startedToPopupSeconds: this.popLimit,
          afterPopupResetSessionSeconds: this.props.sessionResetter.afterPopupResetSessionSeconds + 1000
        }));
      }
    }, 1000);
  }

  componentWillReceiveProps(newProps){
    if (newProps.sessionResetter.afterPopupResetSessionSeconds >= this.resetLimit) {
      this.props.dispatch(commitReset());
      // hashHistory.push("/");

      document.location.href="/"; 
    }
  }

  componentWillUnmount(){

    clearInterval(this.startedPopupInterval);

    $('body').off("mousemove", this.resetTime);
    $(window).off("click", this.resetTime);
    $(window).off("touchstart", this.resetTime);
    $(window).off("touchmove", this.resetTime);
    $(window).off("touchend", this.resetTime);
    $(window).off("mousedown", this.resetTime);
    $(window).off("mouseup", this.resetTime);
  }

  resetTime(e){
    this.props.dispatch(changeSessionResetter({
      startedToPopupSeconds: 0,
      afterPopupResetSessionSeconds: 0
    }));
  }

  render() {
    if (this.props.sessionResetter.startedToPopupSeconds >= this.popLimit) {
      return (
        <div className="session-resetter" onClick={this.resetTime}>
          <div className="session-resetter__alert">
            Session timeout in {(this.resetLimit - this.props.sessionResetter.afterPopupResetSessionSeconds) / 1000 } seconds
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

let mapStateToProps = state => {
  return {
    sessionResetter: state.sessionResetter
  }
};

export default connect(mapStateToProps)(SessionResetter);
