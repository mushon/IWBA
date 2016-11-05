import React, { Component } from 'react';
import { connect } from 'react-redux';

class PourAnim extends Component {
  render() {
    console.log(this.props.pourAnim);
    return (
      <div className="pour-anim" style={{ left: this.props.pourAnim.pos.x + (15 / 2), top: this.props.pourAnim.pos.y - (305 / 2)}}>
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