import {FETCH_LOGSTATE} from '../actions/actions'



export default function(state=[],action){
	//console.log("action",action)
	switch(action.type){
		case FETCH_LOGSTATE:
			return action.payload;  //don't use push because in redux never mutate!
			
	}
	return state;
}