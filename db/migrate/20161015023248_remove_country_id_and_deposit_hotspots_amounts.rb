class RemoveCountryIdAndDepositHotspotsAmounts < ActiveRecord::Migration[5.0]
  def change
    remove_column :deposits, :country_id
    add_column :deposit_hotspots, :amount, :integer, :default => 0
  end
end
