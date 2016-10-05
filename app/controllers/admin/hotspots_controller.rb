class Admin::HotspotsController < Admin::AdminController
  def index
    @hotspots = Hotspot.order("created_at DESC")
  end

  def new
    @hotspot = Hotspot.new
  end

  def create
    @hotspot = Hotspot.new(params.require(:hotspot).permit(:name, :lat, :lon))
  
    if @hotspot.save
      flash[:notice] = 'Successfully updated.'
      redirect_to edit_admin_hotspot_path(@hotspot)
    else
      flash[:alert] = "#{@hotspot.errors.messages.values.join(' ')}"
      redirect_to request.referer
    end
  end
  
  def edit
    @hotspot = Hotspot.find params[:id]
  end

  def update
    @hotspot = Hotspot.find params[:id]
   
    if @hotspot.update_attributes(params.require(:hotspot).permit(:name, :lat, :lon))
    
      flash[:notice] = 'Successfully updated.'
      redirect_to request.referer
    
    else
    
      flash[:alert] = "#{@hotspot.errors.messages.values.join(' ')}"
      redirect_to request.referer
    
    end

  end


  def destroy
    @hotspot= Hotspot.find params[:id]
    @hotspot.destroy
    redirect_to admin_hotspots_path, :notice => 'Successfully destroyed'
  end
end
