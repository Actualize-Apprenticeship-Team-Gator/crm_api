class Outreach < ApplicationRecord
  belongs_to :lead

  validates :outreach_comment, presence: true
end
