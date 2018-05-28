

function  contrasttime(){
	const date=new Date().getTime();
	const time= Math.floor(date/1000);
	const loadtime=wx.getStorageSync('Loadtime');
	if(!loadtime||loadtime==0){
		return 0;
	}
	const ctime=(time-loadtime)/86400;	
	if(ctime>1){
		return 0;
	}else{
		return time;
	}
}



export function getToken() {
	if(contrasttime()==0){
		removeToken();		
	}
	return {
    	token: wx.getStorageSync('TokenKey'),
    	user_id: wx.getStorageSync('UidKey'),
    	head_url:wx.getStorageSync('Head_url'),
    	nickname:wx.getStorageSync('Nickname')
 	}
    
}
export function getUid() {
	if(contrasttime()==0){
		removeToken();		
	}
    return localStorage.getItem('UidKey')
}

export function setToken(token, user_id) {	
    wx.setStorageSync('TokenKey', token)
    wx.setStorageSync('UidKey', user_id)
    const date=new Date().getTime();
	const time= Math.floor(date/1000);
    wx.setStorageSync('Loadtime',time);
}

export function removeToken() {
    wx.removeStorageSync('TokenKey')
   	wx.removeStorageSync('UidKey')
    wx.removeStorageSync('Head_url')
    wx.removeStorageSync('Nickname')
}


