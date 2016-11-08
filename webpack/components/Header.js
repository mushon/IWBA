import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {
  constructor(props){
    super(props);

    this.increment = 5;
    this.state = {
      animDropletCount: 0
    };
  }

  componentDidMount(){
    this.increment = 5;
    this.setAnim(this.props);
  }
  
  componentWillReceiveProps(newProps){
    this.setAnim(newProps);
  }

  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  setAnim(props){
    this.intervalID = clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      if (this.state.animDropletCount < props.dropletCount) {
        this.setState({
          animDropletCount: this.state.animDropletCount + this.increment

        });  

        this.increment++;

      } else {
        this.increment = 5;
        clearInterval(this.intervalID);
        // console.log("cleared");
      }
    }, 10);
  }

  render() {
    return (
      <header>
        
        <div>
          <strong>{ String(Math.floor(this.state.animDropletCount)) }</strong> drops
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
