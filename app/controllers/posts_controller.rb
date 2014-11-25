class PostsController < InheritedResources::Base
	def index
		@posts = Post.paginate(page: params[:page], per_page: 15).order('created_at DESC')
		respond_to do |format|
		  format.html
		  format.js
		end
	end

	def show
		@post = Post.friendly.find(params[:id])
	  	count = @post.countclick + 1
	  	@post.update_attributes(:countclick => count)
	    relate = (params[:id])
	    if relate
	      @related = Post.of_related(relate).last(3)
	    else
	      @related = Post.last(3)
	    end
	end
  private

    def post_params
      params.require(:post).permit(:name, :image, :video, :description, :countclick, :category_id, :user_id, :feature)
    end
end

