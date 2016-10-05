class CreateDepositHotspots < ActiveRecord::Migration[5.0]
  def change
    create_table :deposit_hotspots do |t|
      t.integer :deposit_id
      t.integer :hotspot_id
      t.timestamps
    end

    add_index :deposit_hotspots, :deposit_id
    add_index :deposit_hotspots, :hotspot_id
  end
end
