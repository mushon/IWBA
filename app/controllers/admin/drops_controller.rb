class Admin::DropsController < Admin::AdminController
  def index
    @drops = Drop.order("created_at DESC")
  end

  # def new
  #   @drop = Drop.new
  # end


  # def create
  #   @drop = Drop.new(params.require(:drop).permit(:email))
   
    
  #   if @drop.save
  #     flash[:notice] = 'Successfully updated.'
  #     redirect_to edit_admin_drop_path(@drop)
  #   else

  #     flash[:alert] = "#{@drop.errors.messages.values.join(' ')}"
  #     redirect_to request.referer
  #   end

  # end
  
  # def edit
  #   @drop = Drop.find params[:id]
  # end

  # def update
  #   @drop = Drop.find params[:id]
   
    
  #   if @drop.update_attributes(params.require(:drop).permit(:email))
  #     flash[:notice] = 'Successfully updated.'
  #     redirect_to request.referer
  #   else

  #     flash[:alert] = "#{@drop.errors.messages.values.join(' ')}"
  #     redirect_to request.referer
  #   end

  # end


  def destroy
    @drop= Drop.find params[:id]
    @drop.destroy
    redirect_to admin_drops_path, :notice => 'Successfully destroyed'
  end
end
