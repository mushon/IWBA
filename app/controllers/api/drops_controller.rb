class Api::DropsController < ApplicationController
  def latest 
    @drops = Drop.where("created_at > ?", DateTime.parse(params[:pour_water_stage_time])).order("created_at DESC")


    render json: {success: true, drops: @drops.map {|d| d.conv_to_json} }
  end

  def create
    @drop = Drop.new
    @drop.amount = params[:amount]
    
    if @drop.save
      Drop.first.destroy if Drop.count > 1000
      render json: { success: true, drop: { created_at: @drop.created_at, amount: @drop.amount } }
    else
      render json: { success: false }
    end
  end

end