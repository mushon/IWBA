import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Header } from './components';
import { windowResize, initHotspots, updateAuthToken } from './actions';
import axios from 'axios';

class App extends Component {
	constructor(props){
		super(props);

    mapboxgl.accessToken = 'pk.eyJ1IjoibXVzaG9uIiwiYSI6IjY1bHhhTkEifQ.DhW2zcurHHBtmnc2FsMBqg';
		this.handleResize = this.handleResize.bind(this);	
	}

	componentDidMount(){
		this.props.dispatch(updateAuthToken(document.head.querySelector("[name=csrf-token]").content));
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
		this.loadData();
	}

	loadData(){
		axios.all([axios.get('/api/hotspots.json')])
      .then(axios.spread(response => {
      	this.props.dispatch(initHotspots(response.data.hotspots));
      }));
	}

	handleResize(e){
		this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
	}

	render() {
		return (
			<div>
				{ this.props.children } 
			</div>
		);
	}
}

export default connect()(App);