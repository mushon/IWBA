import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import _ from 'lodash';
import { Header, MapLegend, MapToggleBtn } from '../components';
import { connect } from 'react-redux';
import { updateDeposits } from '../actions';

class MapInvest extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    // if (this.props.hotspots.features.length > 0 && _.isUndefined(this.map)){
       this.map = new mapboxgl.Map({
        container: this.refMapContainer,
        style: 'mapbox://styles/mushon/cittuq85x000s2irqfdmd1kdr',
        doubleClickZoom: false
      });

      this.map.on('style.load', this.handleStyleLoad.bind(this));
    // }
  }

  componentWillReceiveProps(newProps){
    // if (newProps.hotspots.features.length > 0 && _.isUndefined(this.map) ){
      //  this.map = new mapboxgl.Map({
      //   container: this.refMapContainer,
      //   style: 'mapbox://styles/mushon/cittuq85x000s2irqfdmd1kdr',
      //   doubleClickZoom: false
      // });

    // }
  }

  componentDidUpdate(){
    if (!_.isUndefined(this.map)){
      this.map.resize();
    }
  }

  handleStyleLoad(e){
    this.map.addSource("points", {
      "type": "geojson",
      "data": this.props.hotspots
    });



    this.map.addLayer({
      "id": "points",
      "type": "circle",
      "source": "points",
      "paint": {
        "circle-radius": 30,
        "circle-color": "#0053f9",
        "circle-opacity": 0.5
      }
    });

    this.map.addLayer({
      "id": "points-down",
      "type": "circle",
      "source": "points",
      "paint": {
        "circle-radius": 30,
        "circle-color": "#FF0000",
        "circle-opacity": 0.5
      },
      "filter": ["==", "name", ""]
    });

    this.map.on("mousedown", this.handleMouseDown.bind(this));
    this.map.on("mouseup", this.handleMouseUp.bind(this));

    this.map.on("touchstart", this.handleMouseDown.bind(this));
    this.map.on("touchend", this.handleMouseUp.bind(this));
    this.map.on("mousemove", this.handleMouseMove.bind(this));
  }

  handleMouseMove(e){

    var features = this.map.queryRenderedFeatures(e.point, { layers: ["points"] });
    this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  }

  handleMouseDown(e){
    var features = this.map.queryRenderedFeatures(e.point, { layers: ["points"] });
    if (features.length) {

      this.map.setFilter("points-down", ["==", "name", features[0].properties.name]);


      clearInterval(this.downTimer);
      this.downTimer = setInterval(() =>{
        this.props.dispatch(updateDeposits(features[0].properties.name));
      }, 60);
    } else {
      this.map.setFilter("points-down", ["==", "name", ""]);
    }



  }

  handleMouseUp(e){

    clearInterval(this.downTimer);
    this.map.setFilter("points-down", ["==", "name", ""]);
  }

  handleContainerClick(e){
    if (this.props.remainDroplets == 0) {
      hashHistory.push("/5-sending-email");
    }
  }


  render() {

    return (

      <section className="congratulation" onClick={this.handleContainerClick.bind(this)}>
        <header>
        {
          (this.props.dropletCount == this.props.remainDroplets && this.props.dropletCount != 0) ?
          <div>
            You deposited <strong>{ this.props.remainDroplets }</strong> drops<br/>
            Where would you like to invest them?
          </div> :
          this.props.remainDroplets == 0 ?
          <div>
            You have <strong>{ this.props.remainDroplets }</strong> drops left<br/>
            Smartly invested!
          </div> :
          <div>
            You have <strong>{ this.props.remainDroplets }</strong> drops left<br/>
            Where else would you like to invest them?
          </div>
        }
        </header>

        <div className="container" ref={ c => { this.refMapContainer = c; }} style={{ width: this.props.screenWidth - 50, height: this.props.screenHeight - 300 }}>

        </div>

        <div className="toggle-area">
          <div className="fl">
            <MapToggleBtn />
          </div>
          <div className="fr">
            <MapLegend />
          </div>
          <br className="clearing" />
        </div>
      </section>


    );
  }
}

let mapStateToProps = state => {

  let remainDroplets = Math.max(state.dropletCount - _.sumBy(state.deposits, deposit => { return deposit.amount }), 0);

  return {
    dropletCount: state.dropletCount,
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    hotspots: state.hotspots,
    deposits: state.deposits,
    remainDroplets: remainDroplets,
    mapMode: state.mapMode
  }
};


export default connect(mapStateToProps)(MapInvest);
