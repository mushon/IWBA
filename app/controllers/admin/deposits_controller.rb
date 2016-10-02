class Admin::DepositsController < Admin::AdminController
  def index
    @deposits = Deposit.order("created_at DESC")
  end

  def new
    @deposit = Deposit.new
  end


  def create
    @deposit = Deposit.new(params.require(:deposit).permit(:name, :amount_dollar, :exclude_vat_amount_dollar))
   
    
    if @deposit.save
      flash[:notice] = 'Successfully updated.'
      redirect_to edit_admin_deposit_path(@deposit)
    else

      flash[:alert] = "#{@deposit.errors.messages.values.join(' ')}"
      redirect_to request.referer
    end

  end
  
  def edit
    @deposit = Deposit.find params[:id]
  end

  def update
    @deposit = Deposit.find params[:id]
   
    
    if @deposit.update_attributes(params.require(:deposit).permit(:name, :amount_dollar, :exclude_vat_amount_dollar))
      flash[:notice] = 'Successfully updated.'
      redirect_to request.referer
    else

      flash[:alert] = "#{@deposit.errors.messages.values.join(' ')}"
      redirect_to request.referer
    end

  end


  def destroy
    @deposit= Deposit.find params[:id]
    @deposit.destroy
    redirect_to admin_deposits_path, :notice => 'Successfully destroyed'
  end
end
