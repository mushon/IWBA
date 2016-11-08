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

ActiveRecord::Schema.define(version: 20161108040644) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "countries", force: :cascade do |t|
    t.string   "name"
    t.float    "amount"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
    t.integer  "population"
    t.float    "supply_per_year"
    t.float    "withdrawal_per_year"
    t.float    "withdrawal_per_capita"
  end

  create_table "deposit_hotspots", force: :cascade do |t|
    t.integer  "deposit_id"
    t.integer  "hotspot_id"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "amount",     default: 0
    t.index ["deposit_id"], name: "index_deposit_hotspots_on_deposit_id", using: :btree
    t.index ["hotspot_id"], name: "index_deposit_hotspots_on_hotspot_id", using: :btree
  end

  create_table "deposits", force: :cascade do |t|
    t.float    "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "email"
  end

  create_table "drops", force: :cascade do |t|
    t.float    "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hotspots", force: :cascade do |t|
    t.string   "name"
    t.float    "lat"
    t.float    "lon"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.float    "amount"
    t.string   "image_url"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "admin",           default: false
  end

end
