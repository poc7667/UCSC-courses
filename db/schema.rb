# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "product_sources", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.integer  "product_source_id"
    t.float    "price"
    t.string   "title"
    t.string   "author"
    t.date     "date"
    t.datetime "post_time"
    t.text     "content"
    t.integer  "status",            default: 0
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "link"
    t.integer  "sale_type",         default: 0
    t.json     "location"
    t.text     "image_links",       default: [],              array: true
    t.string   "modifiers",                                   array: true
  end

  add_index "products", ["product_source_id"], name: "index_products_on_product_source_id", using: :btree

  add_foreign_key "products", "product_sources"
end
