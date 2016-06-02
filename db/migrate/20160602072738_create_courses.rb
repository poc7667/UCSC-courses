class CreateCourses < ActiveRecord::Migration
  def change
    create_table :courses do |t|
      t.string :cate_name
      t.string :course_name
      t.string :course_id
      t.string :course_number
      t.float :credit_hours
      t.float :tuition_cost
      t.string :site_name
      t.datetime :start_date
      t.datetime :end_date
      t.string :day_of_week
      t.date :termination_date
      t.date :final_enrollment_date
      t.integer :meeting_days_count
      t.json :meeting_days_events

      t.timestamps null: false
    end
  end
end
