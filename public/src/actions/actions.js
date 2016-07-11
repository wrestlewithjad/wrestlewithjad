
export const FETCH_SESSIONID = 'FETCH_SESSIONID'

export function fetchSessionID(sessionId){
	console.log("comment",sessionId)
	return {	
		type: FETCH_SESSIONID,
		payload : sessionId 
	}
}