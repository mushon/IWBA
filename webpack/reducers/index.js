let initialState = {
  screenWidth: 1024,
  screenHeight: 768
};

var defaultReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'WINDOW_RESIZE':
      return {
        ...state,
        screenWidth: action.payload.screenWidth,
        screenHeight: action.payload.screenHeight
      };
    default:
      return state;
  }
};

export {
  defaultReducer
};