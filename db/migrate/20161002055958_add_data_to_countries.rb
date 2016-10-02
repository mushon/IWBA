class AddDataToCountries < ActiveRecord::Migration[5.0]
  def change
    add_column :countries, :population, :integer
    add_column :countries, :supply_per_year, :float
    add_column :countries, :withdrawal_per_year, :float
    add_column :countries, :withdrawal_per_capita, :float
  end
end
