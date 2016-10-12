import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          { String(this.props.droplets) } drops
        </div>
        <div>
          IWBA
        </div>
      </header>
    );
  }
}

let mapStateToProps = state => {
  return {
    droplets: state.droplets
  }
}
export default connect(mapStateToProps)(Header);