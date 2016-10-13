import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          { String(this.props.dropletCount) } drops
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
    dropletCount: state.dropletCount
  }
}
export default connect(mapStateToProps)(Header);