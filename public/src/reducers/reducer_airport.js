import {FETCH_AIRPORT} from '../actions/actions'



export default function(state=[],action){
	switch(action.type){
		case FETCH_AIRPORT:  //If your action has this type, you send the payload.
			return action.payload;  //don't use push because in redux never mutate!  You are creating new instances of a state, like a genie.  It doesn't matter here, but if you are adding to a state, instead of flat replacing it, use concat.

	}
	return state;
}