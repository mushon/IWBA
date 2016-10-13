desc "hotspots sync"

namespace :hotspots do
  task :dump, [:filename] => :environment do |t, args|
    file = File.read(args[:filename])

    json = JSON.parse(file, symbolize_names: true)
    json[:features].each do |feature|
      hotspot = Hotspot.new
      hotspot.name = feature[:properties][:name]
      hotspot.lon = feature[:geometry][:coordinates][0]
      hotspot.lat = feature[:geometry][:coordinates][1]
      if hotspot.save
        puts "#{hotspot.name} saved"
      end
    end
  end
end

