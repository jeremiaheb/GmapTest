class RemoveReservedFromLocations < ActiveRecord::Migration
  remove_column :locations, :reserved
end
