import { combineReducers } from 'redux';
import SessionIDReducer from './reducer_sessionID'
import AirportReducer from './reducer_airport'
import RestaurantsReducer from './reducer_restaurants'

const rootReducer = combineReducers({
  sessionID: SessionIDReducer,
  airportName: AirportReducer,
  restaurants: RestaurantsReducer
});

export default rootReducer;

