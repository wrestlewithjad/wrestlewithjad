
export const FETCH_SESSIONID = 'FETCH_SESSIONID'
export const FETCH_AIRPORT = 'FETCH_AIRPORT'
export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS'

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