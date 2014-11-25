class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :name
      t.string :image
      t.string :video
      t.text :description
      t.integer :countclick, :default => 0
      t.references :category, index: true
      t.references :user, index: true

      t.timestamps
    end
  end
end
