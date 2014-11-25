json.array!(@slides) do |slide|
  json.extract! slide, :id, :name, :image, :video, :description, :user_id, :category_id, :countclick
  json.url slide_url(slide, format: :json)
end
