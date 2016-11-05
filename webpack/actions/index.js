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

export const addTotalDrops = (drops) => {
  return {
    type: "ADD_TOTAL_DROPS",
    payload: {
      drops: drops
    }
  }
}

export const updateAuthToken = (authToken) => {
  return {
    type: "UPDATE_AUTH_TOKEN",
    payload: {
      authToken: authToken
    }
  }
}

export const changeInvestorEmailAddress = (investorEmail) => {
  return {
    type: "CHANGE_EMAIL_ADDRESS",
    payload: {
      investorEmail: investorEmail
    }
  }
}

export const commitReset = () => {
  return {
    type: 'RESET',
    payload: {}
  }
}

export const changeMapMode = (mode) => {
  return {
    type: "CHANGE_MAP_MODE",
    payload: {
      mapMode: mode
    }
  }
}