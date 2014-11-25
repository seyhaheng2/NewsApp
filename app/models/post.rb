class Post < ActiveRecord::Base
  belongs_to :user
  belongs_to :category
  mount_uploader :image, ImageUploader

  # friendly_id :name, use: :slugged
  extend FriendlyId
  friendly_id :name, use: [:slugged, :finders]
  
  include PgSearch
  
  pg_search_scope :search, against: [:name, :description],
				  using: {tsearch: {dictionary: "english"}}

  def self.text_search(query)
  	if query.present?
  		search(query)
  	end
  end

  scope :in_category, lambda{ |cate_id|
    where("category_id = ?", cate_id)
  }

  scope :of_slide, lambda{ 
    where("feature = 0")
  }

  scope :of_post, lambda{ 
    where("feature = 1")
  }

  scope :of_news, lambda{ 
    where("feature = 2")
  }

   scope :of_tech, lambda{ 
    where("feature = 3")
  }



   scope :of_related, lambda { |ca_id|
    where("category_id = ?", ca_id)
  }

  def previous
    @post = Post.where(["id < ?", id]).order(:id).last
  end

  def next
    @post = Post.where(["id > ?", id]).order(:id).first
  end

end
