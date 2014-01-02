class AddRegionId < ActiveRecord::Migration
  def change
    add_column :locations, :region_id, :integer
  end
end
