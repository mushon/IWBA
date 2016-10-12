class Api::HotspotsController < ApplicationController
  def index
    @hotspots = Hotspot.order('created_at DESC')

    render json: {success: true, hotspots: {
        type: "FeatureCollection",
        features: @hotspots.map { |h| h.conv_to_geojson }
      } 
    }
  end
end