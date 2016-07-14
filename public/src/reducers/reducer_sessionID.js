import {FETCH_SESSIONID} from '../actions/actions'



export default function(state=[],action){

	switch(action.type){
		case FETCH_SESSIONID:
			return action.payload;  //don't use push because in redux never mutate!
			//or return [action.payload.data ... state];  means same thing
	}
	return state;
}