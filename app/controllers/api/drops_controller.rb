class Api::DropsController < ApplicationController
  
  def create
    @drop = Drop.new
    @drop.amount = params[:amount]
    
    if @drop.save
      render json: { success: true, drop: { created_at: @drop.created_at, amount: @drop.amount } }
    else
      render json: { success: false }
    end
  end

end