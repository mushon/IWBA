class Deposit < ApplicationRecord
  
  has_many :deposit_hotspots
  has_many :hotspots, :through => :deposit_hotspots

end