# config valid only for current version of Capistrano
lock '3.4.1'

set :application, ENV['APP_NAME']
set :repo_url, 'git@github.com:poc7667/UCSC-courses.git'
set :deploy_to, ENV["PROJECT_PATH"]
set :branch, ENV["BRANCH"] || `git rev-parse --abbrev-ref HEAD`.chop
set :project_root_path, File.dirname(File.expand_path('./../',__FILE__))
set :user, "deploy"
set :nginx_sites_enabled_path, "/etc/nginx/sites-enabled/"

set :use_sudo, false
set :rbenv_ruby, "2.2.2"
set :rbenv_path, "#{ENV['USER_HOME']}/.rbenv"
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w(rake gem bundle ruby rails)
set :rbenv_roles, :all
set :rbenv_type, :user
set :bundle_flags, "--deployment --quiet --binstubs --shebang ruby-local-exec"
set :default_env, { path: "~/.rbenv/shims:~/.rbenv/bin:$PATH" }
set :default_environment, {
  'PATH' => "$HOME/.rbenv/shims:$HOME/.rbenv/bin:$HOME/bin:$HOME/local/bin:$PATH"
}

namespace :system do

  task :misc_tasks do
    on roles(:web) do
      upload! "#{fetch(:project_root_path)}/.env", "#{deploy_to}/current/.env", raise_on_non_zero_exit: false

      # execute "cd #{deploy_to}/current && source $HOME/.zshrc && bundle exec whenever --update-crontab #{ENV['APP_NAME']} ", raise_on_non_zero_exit: false
      # execute "cd #{deploy_to}/current && source $HOME/.zshrc && sudo foreman export -f Procfile upstart /etc/init -a #{ENV['APP_NAME']} -u #{ENV["USER_NAME"]} -l /var/#{ENV['APP_NAME']}.log"
    end
  end

end

namespace :cronjob do
    task :update do
      on roles(:web) do
        execute "cd #{deploy_to}/current/ && whenever  --update-crontab #{ENV['APP_NAME']}"
      end
    end
end


namespace :deploy do

  task :upload_nginx_cfg do
    on roles(:app) do |host|
      upload! "#{Dir.pwd}/config/nginx.conf", "#{deploy_to}/current/config/nginx.conf"
      execute " cd #{fetch(:nginx_sites_enabled_path)} && sudo ln -sf #{deploy_to}/current/config/nginx.conf #{ENV['APP_NAME']}  &&  sudo /etc/init.d/nginx restart "
    end
  end  

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

end


after 'deploy:published', 'deploy:upload_nginx_cfg'
# after 'deploy:published', 'system:misc_tasks'
# after 'deploy:published', 'cronjob:update'
