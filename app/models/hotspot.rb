class Hotspot < ApplicationRecord

  has_many :deposit_hotspots
  has_many :deposits, :through => :deposit_hotspots

end
