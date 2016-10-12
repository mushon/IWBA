import React, { Component } from 'react';

class WaterMockApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount: 1000
    };
  }

  render() {
    return (
      <div>
        <div>
          {this.state.amount}
        </div>
        <a href="javascrit:void(0);">increase</a>
      </div>
    );
  }
}

export default WaterMockApp;

