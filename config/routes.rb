Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1, defaults: {format: 'json'} do
      resources :courses

      get 'shared_course_list/:uid' => "user_courses#shared_course_list"
      resources :user_courses do
      end
    end
  end

  root :controller => 'application', :action => 'go_to_courses_page'
end
