import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          { String(this.props.dropletCount) } <span>drops</span>
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
