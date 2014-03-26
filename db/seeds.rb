# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#


Location.delete_all
open("db/SeedData/locations.csv") do |samples|
  samples.read.each_line do |sample|
    id, lat, lon, reg, level, need, color, reserve = sample.chomp.split(",")
    Location.create(:site => id, :latitude => lat, :longitude => lon, :region_id => reg, :level => level, :need => need, :color => color, :is_reserved => reserve)
  end
end
