import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { defaultReducer } from './reducers';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import App from './App';
import Start from './pages/Start';
import PourWater from './pages/PourWater';
import Congratulation from './pages/Congratulation';
import MapInvest from './pages/MapInvest';

let store = createStore(defaultReducer);

render(
	<Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ App }>
        <IndexRoute component={Start}/>
        <Route path="/1-start" component={Start}/>
        <Route path="/2-pour-water" component={PourWater}/>
        <Route path="/3-congratulation" component={Congratulation}/>
        <Route path="/4-map-invest" component={MapInvest} />
      </Route>
    </Router>

 	</Provider>,
	document.getElementById('root')
);

