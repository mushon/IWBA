import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMapMode } from '../actions';

class MapToggleBtn extends Component {
  handleToggleMapMode(e){
    this.props.dispatch(changeMapMode(this.props.mapMode == "drought" ? "profits" : "drought"));
  }

  render() {
    return (

      <div className="toggle-area">

        <a href="javascript:void(0);" onClick={this.handleToggleMapMode.bind(this)}>
          <div className={`toggle-area__drought-label${ this.props.mapMode == "drought" ? ' active' : ''}`}>
            Drought Prediction 
          </div>
          <div className={`toggle-area__toggle-btn-area ${ this.props.mapMode }`}>
            { this.props.mapMode == 'drought' ? '<--' : '-->' }
          </div>
          <div className={`toggle-area__profits-label${ this.props.mapMode == "profits" ? ' active' : ''}`}>
            Profits Prediction 
          </div>
        </a>

      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    mapMode: state.mapMode
  }
}

export default connect(mapStateToProps)(MapToggleBtn);