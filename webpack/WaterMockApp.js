import React, { Component } from 'react';
import axios from 'axios';

class WaterMockApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      amount: 15
    };
  }
  
  getMetaContentByName(name, content){
   var content = (content==null)?'content':content;
   return document.querySelector("meta[name='"+name+"']").getAttribute(content);
  }

  handleClick(e){
    axios.post('/api/drops.json', {
      amount: this.state.amount,
      authenticity_token: this.getMetaContentByName("csrf-token", "content")
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  handleChange(e){
    this.setState({
      amount: this.refTextBox.value
    })
  }

  render() {
    return (
      <div>
        <div>
          <input type="text" ref={ c => {this.refTextBox = c; }} value={this.state.amount} onChange={this.handleChange.bind(this)} />
        </div>
        <a href="javascrit:void(0);" onClick={this.handleClick.bind(this)}>increase</a>
      </div>
    );
  }
}

export default WaterMockApp;

