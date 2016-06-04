json.array!(@user_courses) do |user_course|
  json.merge! user_course.attributes
end
