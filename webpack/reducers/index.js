import _ from 'lodash';

let initialState = {
  screenWidth: 1024,
  screenHeight: 768,
  droplets: [],
  dropletCount: 0,
  hotspots: {
    type: "FeatureCollection",
    features: []
  },
  deposits: []
};

var defaultReducer = (state = initialState, action) => {
  let newState;

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
      newState = { ...state };

      var deposit = _.find(newState.deposits, deposit => { return deposit.name == action.payload.name });
      if (_.isUndefined(deposit)) {
        deposit = { name: action.payload.name, amount: 1 };
        newState.deposits.push(deposit);
      } else {
        deposit.amount = deposit.amount + 1;
      }

      console.log(newState);
      return newState;
    case 'ADD_TOTAL_DROPS':
      newState = { ...state };

      _.each(action.payload.drops, drop => {
        var result = _.find(newState.droplets, droplet => { return droplet.id == drop.id; });
        
        if (_.isUndefined(result)) {
          newState.droplets.push(drop);
        }
      });
      
      newState.dropletCount = _.sumBy(newState.droplets, droplet => { return droplet.amount; });

      return newState;
    default:
      return state;
  }
};

export {
  defaultReducer
};