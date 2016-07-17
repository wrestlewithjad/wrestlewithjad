
export const FETCH_SESSIONID = 'FETCH_SESSIONID'
export const FETCH_AIRPORT = 'FETCH_AIRPORT'
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'
export const FETCH_FILTER = 'FETCH_FILTER'
export const FETCH_LOGSTATE = 'FETCH_LOGSTATE'

export function fetchSessionID(sessionId){
	console.log("comment",sessionId)
	return {	
		type: FETCH_SESSIONID,
		payload : sessionId 
	}
}
export function fetchAirport(airport){
	return{
		type: FETCH_AIRPORT,
		payload: airport
	}
}
export function fetchRestaurants(restaurants){
	return{
		type:FETCH_RESTAURANTS,
		payload: restaurants
	}
}

export function fetchFilter(filters){
	return{
		type:FETCH_FILTER,
		payload: filters
	}
}
export function fetchLogState(touched){
	return{
		type:FETCH_LOGSTATE,
		payload: touched
	}
}