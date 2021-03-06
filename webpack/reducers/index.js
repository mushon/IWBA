import _ from 'lodash';
import { scaleQuantize } from 'd3';

let initialState = {
  sessionResetter: {
    startedToPopupSeconds: 0,
    afterPopupResetSessionSeconds: 0
  },
  screenWidth: 1024,
  screenHeight: 768,
  droplets: [],
  dropletCount: 0,
  hotspots: {
    type: "FeatureCollection",
    features: []
  },
  authToken: '',
  deposits: [],
  investorEmail: '',
  dropClassScale: scaleQuantize().domain([0, 1500]).range([" scale1", " scale2", " scale3", " scale4", " scale5", " scale6", " scale7", " scale8", " scale9"]),
  pourAnim: {
    show: false,
    pos: null,
    pointSize: 30
  },
  mapMode: "drought" // drought / profits
};

var defaultReducer = (state = initialState, action) => {
  let newState;

  switch(action.type) {
    case 'RESET':
      return {
        ...state,
        droplets: [],
        dropletCount: 0,
        deposits: [],
        investorEmail: ''
      }
    case 'CHANGE_MAP_MODE':
      return {
        ...state,
        mapMode: action.payload.mapMode
      }
    case 'WINDOW_RESIZE':
      return {
        ...state,
        screenWidth: action.payload.screenWidth,
        screenHeight: action.payload.screenHeight
      };
    case 'UPDATE_AUTH_TOKEN':
      return {
        ...state,
        authToken: action.payload.authToken
      }
    case 'CHANGE_EMAIL_ADDRESS':
      return {
        ...state,
        investorEmail: action.payload.investorEmail
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
        deposit = { name: action.payload.name, amount: action.payload.increasedAmount };
        newState.deposits.push(deposit);
      } else {
        deposit.amount = deposit.amount + action.payload.increasedAmount;
      }
      return newState;
    case 'ADD_TOTAL_DROPS':
      newState = { ...state };

      _.each(action.payload.drops, drop => {
        var result = _.find(newState.droplets, droplet => { return droplet.id == drop.id; });

        if (_.isUndefined(result)) {
          drop.amount *= 17; //going for something less round
          newState.droplets.push(drop);
        }
      });

      newState.dropletCount = _.sumBy(newState.droplets, droplet => { return droplet.amount; });

      return newState;
    case 'CHANGE_POUR_ANIM':
      return {
        ...state,
        pourAnim: action.payload.pourAnim
      }
    case 'CHANGE_SESSION_RESETTER':
      return {
        ...state,
        sessionResetter: action.payload.sessionResetter
      }
    default:
      return state;
  }
};

export {
  defaultReducer
};
