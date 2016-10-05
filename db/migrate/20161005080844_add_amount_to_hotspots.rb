class AddAmountToHotspots < ActiveRecord::Migration[5.0]
  def change
    add_column :hotspots, :amount, :float
  end
end
