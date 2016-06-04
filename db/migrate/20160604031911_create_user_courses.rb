class CreateUserCourses < ActiveRecord::Migration
  def change
    create_table :user_courses do |t|
      t.references :user, index: true, foreign_key: true
      t.json :plan

      t.timestamps null: false
    end
  end
end
