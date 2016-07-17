import { combineReducers } from 'redux';
import SessionIDReducer from './reducer_sessionID'
import AirportReducer from './reducer_airport'
import RestaurantsReducer from './reducer_restaurants'
import FilterReducer from './reducer_filter'
import LogStateReducer from './reducer_logState'

const rootReducer = combineReducers({
  sessionID: SessionIDReducer,
  airportName: AirportReducer,
  restaurants: RestaurantsReducer,
  filters: FilterReducer,
  logState:LogStateReducer
});

export default rootReducer;

