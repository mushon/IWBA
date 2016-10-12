export const windowResize = (width, height) => {
  return {
    type: 'WINDOW_RESIZE',
    payload: {
      screenWidth: width,
      screenHeight: height  
    }
  }
};

export const initHotspots = (hotspots) => {
  return {
    type: 'INIT_HOTSPOTS',
    payload: {
      hotspots: hotspots  
    }
  }
};

export const updateDeposits = (name) => {
  return {
    type: "UPDATE_DEPOSITS",
    payload: {
      name: name
    }
  }
}