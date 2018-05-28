import request from '../utils/request.js'

export function postLogin(params) {	
 return request.post("mining/login/index",params)  
}


