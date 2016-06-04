# == Schema Information
#
# Table name: user_courses
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  plan       :json
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_user_courses_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_4a55f742c8  (user_id => users.id)
#

class UserCourse < ActiveRecord::Base
  belongs_to :user
end
