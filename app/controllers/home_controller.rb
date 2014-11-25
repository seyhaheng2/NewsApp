class HomeController < ApplicationController
  def index
    search = params[:query]
    if search.present?
      @posts = Post.text_search(search)
        .paginate(:page => params[:page], :per_page => 12)
    else
      cate_id = params[:id]
      if cate_id
        @posts = Post.order("created_at DESC").in_category(cate_id)
          .paginate(:page => params[:page], :per_page => 12)
      else
          @posts = Post.order("created_at DESC").of_post.paginate(:page => params[:page], :per_page => 4)   
          @slides = Post.of_slide
          @news = Post.of_news.last(3)
          @tech = Post.of_tech.last(4)
      end
    end
  end

  def show
    @post = Post.find(params[:id])
  	count = @post.countclick + 1
  	@post.update_attributes(:countclick => count)
    relate = (params[:id])
    if relate.present?
      @related = Post.of_related(relate).last(3)
    else
      @related = Post.last(3)
    end
  end



end
