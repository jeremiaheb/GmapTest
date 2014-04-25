class LocationsController < ApplicationController
  # GET /locations
  # GET /locations.json
  def index
    @locations = Location.all
    #@primaryJson = []
    #@alternateJson = []
    #@locations.each do |loc|
      #@primaryJson << { site: loc.site, latitude: loc.latitude, longitude: loc.longitude, level: loc.level, iconCode: loc.getIconCode }
    #end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @locations.to_json }
    end
  end

  def regionMap(reg)
    @locations = Location.region(reg).order(:site).search(params[:search])
    @primaryLocations = @locations.select { |location| location.level == 1 || location.level == 3 }
    @alternateLocations = @locations.select { |location| location.level == 2 }
    @primaryJson = []
    @alternateJson = []
    @primaryLocations.each do |loc|
      @primaryJson << { site: loc.site, latitude: loc.latitude, longitude: loc.longitude, level: loc.level, iconCode: loc.getIconCode }
    end
    @alternateLocations.each do |loc|
      @alternateJson << { site: loc.site, latitude: loc.latitude, longitude: loc.longitude, level: loc.level, iconCode: loc.getIconCode }
    end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @primaryJson.to_json }
      format.json { render json: @alternateJson.to_json }
    end
  end
  
  def Florida_Keys
    regionMap(1)
  end

  def DRTO
    regionMap(2)
  end

  def SEFCRI
    regionMap(3)
  end

  def USVI
    regionMap(4)
  end

  # GET /locations/1
  # GET /locations/1.json
  def show
    @location = Location.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @location }
    end
  end

  # GET /locations/new
  # GET /locations/new.json
  def new
    @location = Location.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @location }
    end
  end

  # GET /locations/1/edit
  def edit
    @location = Location.find(params[:id])
  end

  # POST /locations
  # POST /locations.json
  def create
    @location = Location.new(params[:location])

    respond_to do |format|
      if @location.save
        format.html { redirect_to @location, notice: 'Location was successfully created.' }
        format.json { render json: @location, status: :created, location: @location }
      else
        format.html { render action: "new" }
        format.json { render json: @location.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /locations/1
  # PUT /locations/1.json
  def update
    @location = Location.find(params[:id])
    
    @previousMap = Location.WhereAmI(@location.region_id)

    #binding.pry
    respond_to do |format|
      if @location.update_attributes(params[:location])
        format.html { redirect_to @previousMap, notice: 'Location was successfully updated.' }
        format.json { respond_with_bip(@location) }
      else
        format.html { render action: "edit" }
        format.json { respond_with_bip(@location) }
      end
    end
  end

  # DELETE /locations/1
  # DELETE /locations/1.json
  def destroy
    @location = Location.find(params[:id])
    @location.destroy

    respond_to do |format|
      format.html { redirect_to locations_url }
      format.json { head :no_content }
    end
  end
end
