class Drop < ApplicationRecord
  def conv_to_json
    {
      id: self.id,
      amount: self.amount,
      created_at: self.created_at.strftime("%Y/%m/%d %H:%M:%S")
    }
  end
end
