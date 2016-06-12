class Api::V1::UserCoursesController < ApplicationController
  before_action :set_user_course, only: [:show, :edit, :update, :destroy]
  before_action :set_user

  # GET /user_courses
  # GET /user_courses.json
  def index
    @user_courses = []
  end

  # GET /user_courses/1
  # GET /user_courses/1.json
  def show
  end

  def shared_course_list
    user = User.find_by_uid(params["uid"])
    @user_course = UserCourse.where(user_id: user.id).order(:created_at).last
  end

  # GET /user_courses/new
  def new
    @user_course = UserCourse.new
  end

  # GET /user_courses/1/edit
  def edit
  end

  # POST /user_courses
  # POST /user_courses.json
  def create
    @user_course = UserCourse.new(user_course_params)
    @user.user_courses << @user_course
    respond_to do |format|
      if @user_course.save
        format.json { render :show, status: :created }
      else
        format.json { render json: @user_course.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_courses/1
  # PATCH/PUT /user_courses/1.json
  def update
    respond_to do |format|
      if @user_course.update(user_course_params)
        format.json { render :show, status: :ok}
      else
        format.json { render json: @user_course.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_courses/1
  # DELETE /user_courses/1.json
  def destroy
    @user_course.destroy
    respond_to do |format|
      format.json { head :no_content }
    end
  end

  private

    def set_user
      @user=current_user
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user_course
      if current_user
        @user_course = UserCourse.where(user_id: current_user.id).order(:created_at).last
      else
        @user_course = nil
      end
    end


    # Never trust parameters from the scary internet, only allow the white list through.
    def user_course_params
      params.require(:user_course).permit(
        :plan => [:id, :group, "$order"]
      )
    end
end
