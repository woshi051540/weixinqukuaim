<template>
  <div class="container" @click="bindViewTap">
  	<img class="bg" src="../../../static/assets/homebg.png" />
    <div class="userinfo">
    	<div class="userinfo-avatar">
    			<open-data type="userAvatarUrl" ></open-data>
    	</div>
    </div>
    <a  class="counter">点击进入</a>
  </div>
</template>

<script>
import { getToken } from "../../utils/auth";
export default {
  data () {
    return {
       userInfo:{},
       url:'../login/main'
    }
  },
  methods: {
    bindViewTap () {
    	const url=this.url;
    	if(url=='../login/main'){
    			wx.redirectTo({ url });
    	}else{
    		wx.switchTab({ url });
    	}
      
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
              var Token= getToken();
              if(Token.token && Token.user_id){
              	this.url='../Chart/main'
              }            
        }
      })
    },
    clickHandle (msg, ev) {
    
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo();
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width:100%;
  height: 100%;
  top: 20%;
  left:0 ;
  z-index:2;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  overflow:hidden;

}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: #6E5100;
  border: 1px solid #6E5100;
  position: absolute;
  top: 520px;
  z-index:2;
}
.container{position: relative;}
.container .bg{
	width:375px;height:667px;display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	}
</style>
