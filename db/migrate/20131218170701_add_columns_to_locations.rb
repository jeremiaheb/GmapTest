class AddColumnsToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :level, :integer
    add_column :locations, :need, :integer
    add_column :locations, :color, :integer
    add_column :locations, :reserved, :integer
  end
end
