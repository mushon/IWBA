import React, { Component } from 'react';
import { connect } from 'react-redux';

class PourAnim extends Component {
  render() {
    return (
      <div className="pour-anim" style={{ left: this.props.pourAnim.pos.x + this.props.pourAnim.pointSize - 7, top: this.props.pourAnim.pos.y - (305 / 2)}}>
        <img src="/assets/dropping.png" />  
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    pourAnim: state.pourAnim
  }
}

export default connect(mapStateToProps)(PourAnim);