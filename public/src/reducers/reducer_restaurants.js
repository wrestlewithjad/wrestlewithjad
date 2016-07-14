import {FETCH_RESTAURANTS} from '../actions/actions'



export default function(state=[],action){

	switch(action.type){
		case FETCH_RESTAURANTS:
			return action.payload;  //don't use push because in redux never mutate!
			//or return [action.payload.data ... state];  means same thing
	}
	return state;
}