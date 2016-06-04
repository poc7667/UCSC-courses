Rails.application.routes.draw do

  namespace :api do
    namespace :v1, defaults: {format: 'json'} do
      resources :courses
    end
  end

  root :controller => 'application', :action => 'go_to_courses_page'
end
