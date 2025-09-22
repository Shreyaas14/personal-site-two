class AddFieldsToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :tags, :jsonb
    add_column :posts, :url, :string
  end
end
