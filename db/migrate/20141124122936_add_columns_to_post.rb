class AddColumnsToPost < ActiveRecord::Migration
  def change
    add_column :posts, :feature, :integer
  end
end
