class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :locations, :isReserved, :is_reserved
  end
end
