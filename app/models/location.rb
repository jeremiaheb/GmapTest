class Location < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :site, :level, :need, :color, :reserved

  
  scope :alternate,        lambda { where(level: 2) }
  scope :primary,        lambda { where(level: 1) }

  def getIconCode
    [self.need, self.color].join("")
  end
end
