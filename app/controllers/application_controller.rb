class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :checking
  def checking
  	@featured_posts = Post.order(countclick: :desc).first(5)
  end
end
