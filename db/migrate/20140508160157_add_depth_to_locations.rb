class AddDepthToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :depth, :integer
  end
end
