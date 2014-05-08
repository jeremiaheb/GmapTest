class Location < ActiveRecord::Base
  attr_accessible :latitude, :longitude, :site, :level, :need, :color, :is_reserved, :region_id, :fish_complete_date, :fish_complete_agnecy, :demo_complete_agency, :demo_complete_date, :depth

  scope :region,          lambda { |reg| where("region_id = ?", reg) }
  scope :alternate,       lambda { where(level: 2) }
  scope :primary,         lambda { where(level: 1) }

  def getIconCode
    "#{self.need}#{self.color}"
  end
  
  def self.WhereAmI(region)
    case region
    when 1
      :Florida_Keys
    when 2
      :DRTO
    when 3
      :SEFCRI
    when 4
      :USVI
    end
  end

  def self.search(search)
    if !search.blank?
      find(:all, :conditions => ( search ? {:site => search.split( /, */ )} : []))
    else
      find(:all)
    end
  end

end
