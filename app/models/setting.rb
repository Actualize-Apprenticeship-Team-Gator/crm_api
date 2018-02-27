class Setting < ApplicationRecord
  belongs_to :admin

  validates :auto_text, presence: true
end
