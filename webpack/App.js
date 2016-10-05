import React, { Component } from 'react';
import { connect } from 'react-redux';
import { windowResize } from './actions';

class App extends Component {
	constructor(props){
		super(props);

		this.handleResize = this.handleResize.bind(this);	
	}

	componentDidMount(){
		window.addEventListener("resize", this.handleResize);
		// $(window).on('scroll', _.throttle(this.handleScroll, 100));
		this.handleResize();

	}

	handleResize(e){
		this.props.dispatch(windowResize(window.innerWidth, window.innerHeight));
	}


	render() {
		return (
			<div>
				IWBA :: 
			</div>
		);
	}
}

export default connect()(App);