class AddSectionIdToCourse < ActiveRecord::Migration
  def change
    add_column :courses, :section_id, :string
  end
end
