class Api::DepositsController < ApplicationController
  def batch_create
    
    @deposit = Deposit.new
    @deposit.amount = 0.0
    @deposit.email = params[:email]

    unless @deposit.save
      render json: {success: false, errors: @deposit.errors }
      return 
    end

    @deposit_hotspots = []
    @deposit_hotspots_errors = []
    params["deposits"].each do |deposit_param|
      deposit_hotspot = DepositHotspot.new
      deposit_hotspot.hotspot_id = Hotspot.where(name: deposit_param["name"]).first.id
      deposit_hotspot.deposit_id = @deposit.id
      deposit_hotspot.amount = deposit_param["amount"].to_f
      
      if deposit_hotspot.save
        @deposit_hotspots << deposit_hotspot
        @deposit.amount = @deposit.amount + deposit_param["amount"].to_f rescue 0
      else
        @deposit_hotspots_errors << deposit_hotspot.errors
      end
    end

    if @deposit.save
      DepositMailer.deposit_mail(@deposit).deliver_later
      render json: {success: true, deposit: @deposit.conv_to_json, deposit_hotspots: @deposit_hotspots.map {|dh| dh.conv_to_json }, deposit_hotspots_errors: @deposit_hotspots_errors}
    else
      render json: {success: false, errors: @deposit.errors, deposit_hotspots_errors: @deposit_hotspots_errors }
    end

  end

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