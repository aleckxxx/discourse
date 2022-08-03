class Post < ApplicationRecord
    belongs_to :creator, class_name: 'User'
    has_many :replies, dependent: :destroy
end
