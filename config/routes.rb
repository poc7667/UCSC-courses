Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1, defaults: {format: 'json'} do
      resources :courses
      resources :user_courses
    end
  end

  root :controller => 'application', :action => 'go_to_courses_page'
end
