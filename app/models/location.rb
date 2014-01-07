class Location < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :site, :level, :need, :color, :reserved, :region_id, :fish_complete_date, :fish_complete_agnecy, :demo_complete_agency, :demo_complete_date

  scope :region,          lambda { |reg| where("region_id = ?", reg) }
  scope :alternate,       lambda { where(level: 2) }
  scope :primary,         lambda { where(level: 1) }

  def getIconCode
    [self.need, self.color].join("")
  end


  def self.search(search)
    if !search.blank?
      find(:all, :conditions => ( search ? { :site => search.split( /, */ ) } : [] ))
    else
      find(:all)
    end
  end

end
