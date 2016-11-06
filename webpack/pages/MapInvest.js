import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import _ from 'lodash';
import { Header, MapLegend, MapToggleBtn, PourAnim, SessionResetter } from '../components';
import { connect } from 'react-redux';
import { updateDeposits, changePourAnim } from '../actions';
import MarkerIconLayersGenerator from '../components/MarkerIconLayersGenerator';

class MapInvest extends Component {
  constructor(props){
    super(props);

    this.scaleLayers = [];
    this.easingAmount = 1;
    this.triggerNextPage = false;
  }

  componentDidMount(){
    // if (this.props.hotspots.features.length > 0 && _.isUndefined(this.map)){
       this.map = new mapboxgl.Map({
        container: this.refMapContainer,
        style: 'mapbox://styles/mushon/cittuq85x000s2irqfdmd1kdr',
        doubleClickZoom: false,
        zoom: 1.7,
        center: [63, 31]
      });

      window.map = this.map;


      this.map.dragRotate.disable();
      this.map.touchZoomRotate.disableRotation();
      this.layerGenerator = new MarkerIconLayersGenerator(this.props.dropletCount);
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

    if (newProps.mapMode != this.props.mapMode) {
      this.changeMapMode(newProps);
    }


    if (!_.isUndefined(this.map.getSource("points-invested"))){
      this.map.getSource("points-invested").setData(newProps.hotspotsInvested);
      this.map.getSource("points").setData(newProps.hotspotsInvested);
    }

    if (newProps.remainDroplets <= 0 && !this.triggerNextPage) {

      this.triggerNextPage = true;
      _.delay(() => {
        hashHistory.push("/5-sending-email");
      }, 2000);
    }


  }

  componentWillUnmount(){

    this.triggerNextPage = false;

  }

  changeMapMode(props){
    var layerNames = _.keys(this.map.style._layers);
    var droughtLayerNames = _.filter(layerNames, layerName => { return layerName.indexOf("drought") > -1; });
    var profitLayerNames = _.filter(layerNames, layerName => { return layerName.indexOf("profit") > -1; });


    if (props.mapMode === 'drought') {
      _.each(droughtLayerNames, droughtLayerName => {
        this.map.setLayoutProperty(droughtLayerName, 'visibility', 'visible');
      });

      _.each(profitLayerNames, profitLayerName => {
        this.map.setLayoutProperty(profitLayerName, 'visibility', 'none');
      });
    } else {
      _.each(droughtLayerNames, droughtLayerName => {
        this.map.setLayoutProperty(droughtLayerName, 'visibility', 'none');
      });

      _.each(profitLayerNames, profitLayerName => {
        this.map.setLayoutProperty(profitLayerName, 'visibility', 'visible');
      });

    }
  }

  componentDidUpdate(){
    if (!_.isUndefined(this.map)){
      this.map.resize();
    }
  }

  handleStyleLoad(e){
    this.map.addSource("points", {
      "type": "geojson",
      "data": this.props.hotspotsInvested
    });

    this.map.addSource("points-invested", {
      "type": "geojson",
      "data": this.props.hotspotsInvested
    });


    this.scaleLayers = this.layerGenerator.getLayers();

    _.each(this.scaleLayers, layer => {
      this.map.addLayer(layer);
    });

    this.map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": "points",
      "layout": {
        "icon-image": "marker"
      },
      "filter": ["any",
        ["!has", "investedDrops"],
        ["==", "investedDrops", 0]
      ]
    });

    this.map.addLayer({
      "id": "points-down",
      "source": "points",
      "type": "symbol",
       "layout": {
        "icon-image": "marker-invested"
      },
      "filter": [">", "investedDrops", 0]
    });




    this.map.on("mousedown", this.handleMouseDown.bind(this));
    this.map.on("mouseup", this.handleMouseUp.bind(this));

    this.map.on("touchstart", this.handleMouseDown.bind(this));
    this.map.on("touchend", this.handleMouseUp.bind(this));
    this.map.on("mousemove", this.handleMouseMove.bind(this));
  }

  handleMouseMove(e){

    var features = this.map.queryRenderedFeatures(e.point, { layers: ["points", "points-down"].concat(this.layerGenerator.layerNames) });
    this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  }

  handleMouseDown(e){

    if (this.props.remainDroplets > 0) {
      var features = this.map.queryRenderedFeatures(e.point, { layers: ["points", "points-down"].concat(this.layerGenerator.layerNames)  });
      if (features.length) {

        // this.map.setFilter("points-down", ["==", "name", features[0].properties.name]);


        clearInterval(this.downTimer);
        this.downTimer = setInterval(() =>{

          this.props.dispatch(changePourAnim({ show: true, pointSize: 30, pos: this.map.project(features[0].geometry.coordinates) }));
          this.props.dispatch(updateDeposits(features[0].properties.name, this.easingAmount));
          this.easingAmount++;
        }, 60);
      } else {
        // this.map.setFilter("points-down", ["==", "name", ""]);
      }

    }



  }

  handleMouseUp(e){
    this.easingAmount = 1;

    clearInterval(this.downTimer);
    this.props.dispatch(changePourAnim({ show: false }));
  }

  handleContainerClick(e){
    if (this.props.remainDroplets == 0) {
      hashHistory.push("/5-sending-email");
    }
  }


  render() {

    return (

      <section className="congratulation">
        <header onClick={this.handleContainerClick.bind(this)} >
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
        <div className="container" ref={ c => { this.refMapContainer = c; }} style={{ width: this.props.screenWidth - 50, height: this.props.screenHeight - 230 }}>
        {
          this.props.pourAnim.show ?
          <PourAnim /> : null
        }

        </div>
        <MapToggleBtn />

        <MapLegend />
        <SessionResetter />
      </section>


    );
  }
}

let mapStateToProps = state => {

  let remainDroplets = Math.max(state.dropletCount - _.sumBy(state.deposits, deposit => { return deposit.amount }), 0);

  let hotspotsInvested = { ...state.hotspots };
  _.each(state.deposits, (deposit, i) => {
    var hotspotIdx = _.findIndex(hotspotsInvested.features, hotspot => { return hotspot.properties.name == deposit.name });

    hotspotsInvested.features[hotspotIdx].properties.investedDrops = deposit.amount;

  }); // deposit = { name: action.payload.name, amount: 5 };

  _.each(hotspotsInvested.features, (hotspot, i) => {
    if (_.isUndefined(hotspot.properties.investedDrops)) {
      hotspotsInvested.features[i].properties.investedDrops = 0;
    }
  });

  return {
    pourAnim: state.pourAnim,
    dropletCount: state.dropletCount,
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight,
    hotspots: state.hotspots,
    deposits: state.deposits,
    remainDroplets: remainDroplets,
    mapMode: state.mapMode,
    hotspotsInvested: hotspotsInvested,
    sessionResetter: state.sessionResetter
  }
};


export default connect(mapStateToProps)(MapInvest);
