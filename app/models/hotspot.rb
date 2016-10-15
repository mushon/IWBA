class Hotspot < ApplicationRecord

  has_many :deposit_hotspots, :dependent => :destroy
  has_many :deposits, :through => :deposit_hotspots

  validates :name, :uniqueness => true, :presence => true

  def conv_to_geojson
    {
      type: "Feature",
      properties: {
        name: self.name
      },
      geometry: {
        type: "Point",
        coordinates: [
          self.lon,
          self.lat
        ]
      }
    }
  end
end
