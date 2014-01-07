class ChangeReseredFormatInLocations < ActiveRecord::Migration
  def change
    add_column :locations, :isReserved, :Boolean
  end

end
