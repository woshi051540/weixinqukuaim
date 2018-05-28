import request from "../utils/request.js"

/*涨跌图*/
export function price(params) {	
 return request.post("mining/chart/price", params);  
}
/*利息图*/
export function interest(params) {	
 return request.post("mining/chart/interest", params);  
}

/*成交量*/
export function volume(params) {	
 return request.post("mining/chart/volume", params);  
}


