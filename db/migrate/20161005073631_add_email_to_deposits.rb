class AddEmailToDeposits < ActiveRecord::Migration[5.0]
  def change
    add_column :deposits, :email, :string
  end
end
