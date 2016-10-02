ISO3166::Country.all.each do |cd|
  c = Country.new
  c.name = cd.data["translations"]["en"]
  c.save
end

