class Api::V1::PostController < Api::V1::ApplicationController
    before_action :authorize_request, except: [:index,:show]
    #GET /api/v1/posts
    def index
     @posts = Post.order('created_at desc')
     render json: @posts, status: :ok
    end
    #GET /api/v1/posts/1
    def show
      @post = Post.find(params[:id])
      render json: @post.to_json(include: {creator:{:except => :password_digest},replies: {include:{creator: {:except => :password_digest}}}}), status: :ok
    end
    
    #POST /api/v1/posts
    def create
      @new_post = Post.create(post_params)
      @new_post.creator_id = @current_user.id
      if @new_post.save
        render json: @new_post, status: :ok
      else
        render json: {message: "Your input is wrong!", errors: @new_post.errors.to_hash}, status: :bad_request
      end
    end

    #PUT /api/v1/posts/1
    def update
      @post = Post.find(params[:id])
      if @current_user.id == @post.creator_id
        @post.update!(post_params)
        render json: @post, status: :ok
      else
        render json: {message: "You can't modify a post you didn't create."}, status: :unauthorized
      end
    end 

    #delete /api/v1/posts/1
    def delete
      @post = Post.find(params[:id])
      if @current_user.id == @post.creator_id
        @post.destroy!
        render json: @post, status: :ok
      else
        render json: {message: "You can't delete a post you didn't create."}, status: :unauthorized
      end
    end

    private 
    def post_params
        params.permit(:title, :body)
    end
end