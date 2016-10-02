class Admin::CountriesController < Admin::AdminController
  def index
    @countries = Country.order("created_at DESC")
  end

  def new
    @country = Country.new
  end


  def create
    @country = Country.new(params.require(:country).permit(:name, :amount_dollar, :exclude_vat_amount_dollar))
   
    
    if @country.save
      flash[:notice] = 'Successfully updated.'
      redirect_to edit_admin_country_path(@country)
    else

      flash[:alert] = "#{@country.errors.messages.values.join(' ')}"
      redirect_to request.referer
    end

  end
  
  def edit
    @country = Country.find params[:id]
  end

  def update
    @country = Country.find params[:id]
   
    
    if @country.update_attributes(params.require(:country).permit(:name, :amount_dollar, :exclude_vat_amount_dollar))
      flash[:notice] = 'Successfully updated.'
      redirect_to request.referer
    else

      flash[:alert] = "#{@country.errors.messages.values.join(' ')}"
      redirect_to request.referer
    end

  end


  def destroy
    @country= Country.find params[:id]
    @country.destroy
    redirect_to admin_countries_path, :notice => 'Successfully destroyed'
  end
end
