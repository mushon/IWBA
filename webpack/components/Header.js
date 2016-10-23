import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      animDropletCount: 0
    };
  }

  componentDidMount(){
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
          animDropletCount: this.state.animDropletCount + 2
        });  
      } else {
        clearInterval(this.intervalID);
        console.log("cleared");
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
