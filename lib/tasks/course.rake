def load_config_file(file_name)
  file_path = File.join(Rails.root, 'config', file_name)
  JSON.parse(File.read(file_path))
end

namespace :course do

  task :clear_all => :environment do
    [:destroy_all, :reset_pk_sequence].each do |action|
      ["Course"].each do |model|
        model.constantize.send(action)
      end
    end
  end

  task :course => :environment do
    course_params = load_config_file("course.json")
    course_params.each do |params|
      meeting_days_events = params.delete("meeting_days_events")
      course = Course.find_or_create_by(params)
      course.meeting_days_events = meeting_days_events
      course.save
    end
  end

  task :all => [:course]
end


task :import_course => 'course:all'