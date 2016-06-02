source 'http://rubygems.org'
#ruby "2.3.1"
# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
# gem 'rails', '~> 5.0.0'
gem 'rails', '~> 4.2.4'#, git: "git@github.com:rails/rails.git", branch: "4-2-stable"
gem 'bundler', '1.12.5'
# Use mysql as the database for Active Record
gem 'pg', '0.18.4'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
#gem 'jbuilder', '~> 2.0'
gem 'jbuilder',  :git=> 'https://github.com/poc7667/jbuilder.git'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
  # Access an IRB console on exception pages or by using <%= console %> in views  
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'rspec-rails', '3.4.2'
  gem 'guard-rspec'
  gem 'spring-commands-rspec'
  gem 'spring'
  gem 'rspec-deep-ignore-order-matcher'
  gem 'faker', '1.6.3'
  gem 'erb2haml' #rake haml:replace_erbs
  gem 'quiet_assets'
  gem 'zeus'
  # gem 'pry', '< 0.10.0'
  gem 'pry', '0.10.3'
  gem 'pry-stack_explorer'  
  gem 'pry-awesome_print'
  gem 'pry-byebug'
  # gem 'pry-rails'
  gem "capistrano",  "~> 3.4.0", require: false
  gem "capistrano-rails", "~> 1.1", require: false
  gem "capistrano-rbenv", "~> 2.0.4", require: false # production server use rbenv
  gem 'capistrano-puma',  require: false
  gem 'capistrano-file-permissions'
  gem "rspec-expectations"
  gem 'cancancan'
  # RSPEC
  gem 'launchy'
  gem 'factory_girl_rails'
  gem 'factory_girl'
end

group :development do
  gem 'web-console', '~> 2.0'
end

group :test do
  gem 'cucumber-rails', :require => false
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'database_cleaner'
  gem 'email_spec'
  gem 'shoulda', '3.5.0'
  gem 'shoulda-matchers', '2.8.0'
end

gem 'puma', '2.16.0'
gem "awesome_print", require: "ap"

gem 'dotenv-rails'
# gem 'paperclip', '4.3.6'
gem 'paperclip', :git=> 'https://github.com/thoughtbot/paperclip', :ref => '523bd46c768226893f23889079a7aa9c73b57d68'

gem 'database_yml'
gem 'annotate' # show DB attrs


gem 'devise', '4.0.0'
gem 'devise_token_auth', '0.1.37'
gem 'rack-cors', require: 'rack/cors'
gem 'omniauth'
gem 'omniauth-facebook'

gem 'aws-sdk', '>= 2.0.34'
gem "ses"


# console auto complete
gem "rb-readline"
gem "hirb-unicode"
gem "bond"
gem 'rails-erd'
gem "nokogiri", "1.6.7.2"

gem 'acts-as-taggable-on', '~> 3.4'

# Elastic search
gem 'elasticsearch-model', git: 'git://github.com/elasticsearch/elasticsearch-rails.git'
gem 'elasticsearch-rails', git: 'git://github.com/elasticsearch/elasticsearch-rails.git'

gem "i18n-js", ">= 3.0.0.rc11"

gem 'annotate' # show DB attrs
