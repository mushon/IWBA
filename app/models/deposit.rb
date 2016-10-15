class Deposit < ApplicationRecord
  
  has_many :deposit_hotspots, :dependent => :destroy
  has_many :hotspots, :through => :deposit_hotspots

  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }

  def conv_to_json
    {
      id: self.id,
      email: self.email,
      amount: self.amount
    }
  end

end