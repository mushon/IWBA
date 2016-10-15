class DepositHotspot < ApplicationRecord
  belongs_to :deposit
  belongs_to :hotspot

  def conv_to_json
    {
      id: self.id,
      hotspot_name: self.hotspot.name,
      amount: self.amount
    }
  end
end
