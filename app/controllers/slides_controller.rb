class SlidesController < InheritedResources::Base

  private

    def slide_params
      params.require(:slide).permit(:name, :image, :video, :description, :user_id, :category_id, :countclick)
    end
end

