import { scaleLinear, scaleLog, interpolateRgb, interpolateHsl } from 'd3';

class MarkerIconLayersGenerator {
  constructor(max){
    this.extent = [0, max];
    this.increment_count = 200;
  }

  getLayers(){
    this.layers = [];
    this.layerNames = [];

    this.scale = scaleLinear()
      .domain(this.extent)
      .clamp(true)
      .range([1, 3]);
    // debugger;
    var increment = (this.extent[this.extent.length - 1] - this.extent[0]) / this.increment_count;
    var idx = 0;
    var i = 0;


    for (i = this.extent[0]; i < this.extent[this.extent.length - 1]; i += increment){
      var style_id = `marker-icon-layers__${idx}`;
      var size = this.scale(i);
      var filter =['all',
        [ '>=', "investedDrops", i ],
        [ '<', "investedDrops", i + increment ]
      ];

      this.layers.push({
        "id": style_id,
        "type": "symbol",
        "source": "points-invested",
        "filter": filter,
        "layout": {
          "icon-image": "marker-scale",
          "icon-size": size
        }
      });
      this.layerNames.push(style_id);
      idx++;
    }

    this.layers.push({
        "id": "marker-icon-layers__max",
        "type": "symbol",
        "source": "points-invested",
        "filter": [ '>=', "investedDrops", i ],
        "layout": {
          "icon-image": "marker-scale",
          "icon-size": 3.5
        }
      });

    this.layerNames.push("marker-icon-layers__max");
    return this.layers;
  }
}

export default MarkerIconLayersGenerator;