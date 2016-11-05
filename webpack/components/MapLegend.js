import React, { Component } from 'react';
import { connect } from 'react-redux';

class MapLegend extends Component {
  render() {
    return (
      <div className="map-legend">
        <ul>
          <li className="map-legend__label">
            { this.props.mapMode == "drought" ? "Severe" : "Great" }
          </li>
          <li className={`map-legend__legend-bar--${this.props.mapMode}-five`}>
          </li>

          <li className={`map-legend__legend-bar--${this.props.mapMode}-four`}>
          </li>

          <li className={`map-legend__legend-bar--${this.props.mapMode}-three`}>
          </li>

          <li className={`map-legend__legend-bar--${this.props.mapMode}-two`}>
          </li>

          <li className={`map-legend__legend-bar--${this.props.mapMode}-one`}>
          </li>

          <li className="map-legend__label">
            Low
          </li>
        </ul>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    mapMode: state.mapMode
  }
}

export default connect(mapStateToProps)(MapLegend);