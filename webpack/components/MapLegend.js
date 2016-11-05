import React, { Component } from 'react';
import { connect } from 'react-redux';

class MapLegend extends Component {
  render() {
    return (
      <div class="map-legend">
        <ul>
          <li className="map-legend__label">
            { this.props.mapMode == "drought" ? "Severe" : "Great" }
          </li>
          <li className={`map-legend__${this.props.mapMode}-level5`}>
          </li>

          <li className={`map-legend__${this.props.mapMode}-level4`}>
          </li>

          <li className={`map-legend__${this.props.mapMode}-level3`}>
          </li>

          <li className={`map-legend__${this.props.mapMode}-level2`}>
          </li>

          <li className={`map-legend__${this.props.mapMode}-level1`}>
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