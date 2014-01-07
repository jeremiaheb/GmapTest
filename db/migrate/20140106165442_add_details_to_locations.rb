class AddDetailsToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :fish_complete_agnecy, :string
    add_column :locations, :fish_complete_date, :date
    add_column :locations, :demo_complete_agency, :string
    add_column :locations, :demo_complete_date, :date
  end
end
