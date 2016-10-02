class Country < ApplicationRecord
  has_many :deposits

  validates :name, :uniqueness => true, :presence => true
end
