import { getToken } from "./auth";
import Promise  from 'es6-promise'

var request={
	 post:function(url,params){
	 var requestTask=new Promise((resolve,reject) => {
			function suc(d){
				if(d.statusCode==200){
					 const res = d.data  
					if(res.code!=='0000'){
						if(res.code === '1001') {
					        reject("提交数据为空")
				      } else if(res.code === '1002') {
				        reject("请求错误")
				      }else if(res.code === '1003' || res.code === '1004'){  
				      	wx.showModal({
				      		title:'温馨提醒',
				      		content:"请登录后操作",
				      		showCancel:false,
				      		success: function(resd) {
							    if (resd.confirm) {
							     	wx.redirectTo({url:'../login/main'})
							    } 
							  }
				      	});	
				      }else if(res.code === '0001'){
				      	 reject(res.message?res.message:"请求错误")
				      }else{
							resolve(res)
				      }						
					}else{
						resolve(res)
					}
								
				}else{
					 reject("网络错误")
				}
			}
			function erro(d){
				reject(d.err_msg)
			}	
			if(url.indexOf('http://qkm.baodekeji.com')<0){
				url='https://qkm.baodekeji.com/'+url;
			}
			const state=getToken();
			if(url.indexOf('mining/login/index')>0){
				params['token']=null
				params['user_id']=null
			}else if(state&&state.token && state.user_id){
				params['token']=state.token
				params['user_id']=state.user_id
			}else{
				wx.navigateTo({url:'pages/login'})
			}	
			wx.request({
				url:url,
				data:params,
				method:'POST',
				success:suc,
				fail:erro
			});
	 	});	 	
	 	
		return requestTask;
	},
	get:function(url,params){		
	var  requestTask=new Promise((resolve,reject) => {
			function suc(d){
				if(d.statusCode==200){
					 const res = d.data  
					if(res.code!=='0000'){
						if(res.code === '1001') {
					        reject("提交数据为空")
				      } else if(res.code === '1002') {
				        reject("请求错误")
				      }else if(res.code === '1003' || res.code === '1004'){  
				      	wx.showModal({
				      		title:'温馨提醒',
				      		content:"请登录后操作",
				      		showCancel:false,
				      		success: function(resd) {
							    if (resd.confirm) {
							     	wx.navigateTo({url:'pages/login'})
							    } 
							  }
				      	});	
				      }else if(res.code === '0001'){
				      	 reject(res.message?res.message:"请求错误")
				      }else{
							resolve(res)
				      }						
					}else{
						resolve(res)
					}
								
				}else{
					 reject("网络错误")
				}
			}
			function erro(d){
				reject(d.err_msg)
			}	
			if(url.indexOf('http://qkm.baodekeji.com')<0){
				url='https://qkm.baodekeji.com/'+url;
			}
			const state=getToken();
			if(url.indexOf('mining/login/index')>0){
				params['token']=null
				params['user_id']=null
			}else if(state&&state.token && state.user_id){
				params['token']=state.token
				params['user_id']=state.user_id
			}else{
				wx.navigateTo({url:'pages/login'})
			}	
			wx.request({
				url:url,
				data:params,
				success:suc,
				fail:erro
			});
	 	});
		return requestTask;
	}
}
export default request