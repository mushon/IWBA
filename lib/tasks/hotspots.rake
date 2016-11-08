# require 'open-uri'

desc "hotspots sync"

namespace :hotspots do
  task :dump, [:filename] => :environment do |t, args|
    # file_data = open(args[:filename])

    json = JSON.parse(File.read("./hotspots_1011.json"), symbolize_names: true)
    json[:features].each do |feature|
      hotspot = Hotspot.where(name: "#{feature[:properties][:Title]} #{feature[:properties][:COUNTRY]}").count > 0 ? Hotspot.where(name: "#{feature[:properties][:Title]}, #{feature[:properties][:COUNTRY]}").first : Hotspot.new
      hotspot.name = "#{feature[:properties][:Title]}, #{feature[:properties][:COUNTRY]}"
      hotspot.lon = feature[:geometry][:coordinates][0]
      hotspot.lat = feature[:geometry][:coordinates][1]
      if hotspot.save
        puts "#{hotspot.name} saved"
      end
    end
  end
end

