# == Schema Information
#
# Table name: courses
#
#  id                    :integer          not null, primary key
#  cate_name             :string
#  course_name           :string
#  course_id             :string
#  course_number         :string
#  credit_hours          :float
#  tuition_cost          :float
#  site_name             :string
#  start_date            :datetime
#  end_date              :datetime
#  day_of_week           :string
#  termination_date      :date
#  final_enrollment_date :date
#  meeting_days_count    :integer
#  meeting_days_events   :json
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  section_id            :string
#

class Course < ActiveRecord::Base
  validates :course_number, uniqueness: {scope: [:course_number, :start_date]}
end
