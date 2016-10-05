class CreateHotspots < ActiveRecord::Migration[5.0]
  def change
    create_table :hotspots do |t|
      t.string :name
      t.float :lat
      t.float :lon

      t.timestamps
    end
  end
end
