class CreateDeposits < ActiveRecord::Migration[5.0]
  def change
    create_table :deposits do |t|
      t.float :amount
      t.integer :country_id

      t.timestamps
    end

    add_index :deposits, :country_id
  end
end
