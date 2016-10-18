import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <strong>{ String(this.props.dropletCount) }</strong> drops
        </div>
        <div id="logo">
          IWBA
        </div>
      </header>
    );
  }
}

let mapStateToProps = state => {
  return {
    dropletCount: state.dropletCount
  }
}
export default connect(mapStateToProps)(Header);
