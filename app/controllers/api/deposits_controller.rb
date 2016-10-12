class Api::DepositsController < ApplicationController
  
  def create
    @deposit = Deposit.new
    @deposit.amount = params[:amount]
    
    if @deposit.save
      render json: { success: true, deposit: { created_at: @deposit.created_at, amount: @deposit.amount } }
    else
      render json: { success: false }
    end
  end

end