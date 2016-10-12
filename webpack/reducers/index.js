import _ from 'lodash';

let initialState = {
  screenWidth: 1024,
  screenHeight: 768,
  droplets: 1000,
  hotspots: {
    type: "FeatureCollection",
    features: []
  },
  deposits: []
};

var defaultReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'WINDOW_RESIZE':
      return {
        ...state,
        screenWidth: action.payload.screenWidth,
        screenHeight: action.payload.screenHeight
      };
    case 'INIT_HOTSPOTS':
      return {
        ...state,
        hotspots: action.payload.hotspots
      };
    case 'UPDATE_DEPOSITS':
      let newState = { ...state };

      var deposit = _.find(newState.deposits, deposit => { return deposit.name == action.payload.name });
      if (_.isUndefined(deposit)) {
        deposit = { name: action.payload.name, amount: 1 };
        newState.deposits.push(deposit);
      } else {
        deposit.amount = deposit.amount + 1;
      }

      console.log(newState);
      return newState;

    default:
      return state;
  }
};

export {
  defaultReducer
};