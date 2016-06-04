require 'rails_helper'

RSpec.describe "Api::V1::UserCourses", type: :request do
  describe "GET /api_v1_user_courses" do
    it "works! (now write some real specs)" do
      get api_v1_user_courses_path
      expect(response).to have_http_status(200)
    end
  end
end
