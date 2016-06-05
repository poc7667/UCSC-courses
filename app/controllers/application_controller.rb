class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format.json? }

  def go_to_courses_page
      redirect_to "/portal/index.html#/pages/scrum_board"
  end
end
