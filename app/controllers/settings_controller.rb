class SettingsController < ApplicationController
  before_action :authenticate_admin!

  def edit
    @auto_text = current_admin.setting.auto_text 
  end

  def update
    setting = Setting.find_or_initialize_by(admin_id: current_admin.id)
    setting.auto_text = params[:body]
    if setting.save
      flash[:success] = "Settings Saved!!"
      redirect_to "/"
    else
      flash[:error] = "Error"
      render "edit.html.erb"
    end
  end
end
    

