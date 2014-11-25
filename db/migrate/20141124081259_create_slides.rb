class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.string :name
      t.string :image
      t.string :video
      t.text :description
      t.references :user, index: true
      t.references :category, index: true
      t.integer :countclick, :default => 0

      t.timestamps
    end
  end
end
