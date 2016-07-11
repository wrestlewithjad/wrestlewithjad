import { combineReducers } from 'redux';
import SessionIDReducer from './reducer_sessionID'

const rootReducer = combineReducers({
  sessionID: SessionIDReducer
});

export default rootReducer;

