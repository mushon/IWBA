class DepositHotspot < ApplicationRecord
  belongs_to :deposit
  belongs_to :hotspot
end
