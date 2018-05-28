<template>
  <div class="Logins">
  	<div class="topimg">
  	<img src="../../../static/assets/loginbg.png" />
  	</div>
  		<ul>
  			<li>
  				<h4>手机号</h4>
  				<input type="text" name="" v-model="name" placeholder="请输入手机号" maxlength="20">
  			</li>
  		<li>
  				<input type="password" v-model="password" placeholder="请输入您的密码" maxlength="20">
  			</li>
  			<li>
  				<a class="scanvas" @click="refreshCode">
  					<SIdentify :fontSizeMin="fontSizeMin" :contentWidth="contentWidth" :contentHeight="contentHeight" :identifyCode="identifyCode"></SIdentify>
  				</a>
  				<input type="text" v-model="code" placeholder="请输入验证码" style="width:170px;" maxlength="10">  				
  			</li>	
     		<li>
  				<button @click="login" :disabled="logindisabled" >登 &nbsp;录</button>
  			</li>
  			<li class="link">
  				<router-link style=" float: right;" to="/forget">忘记密码</router-link>
  				 <router-link to="/register">注册</router-link> 	
  			</li>
      </ul>
      <div class="bottoms clearfix">      	
      	<span>登录即表示同意《<router-link  to="/protocol">区块猫用户协议</router-link>》</span> 
      	<router-link  style=" float:right;"  to="/course">IOS添加信任教程</router-link>
      </div>
  </div>
</template>
<script>
import { postLogin } from "../../api/auth";
import { setToken } from "../../utils/auth";
import SIdentify from '../../components/identify.vue'
export default {
  data() {
    return {
      name:"15738849971",
      //name:"",      
      password: "123456",
      //password: "",
      identifyCode:"",
      code:"",
      identifyCodes:"1234567890",
      contentWidth:120,
      contentHeight:38,
      fontSizeMin:20,
      logindisabled:false
    };
  },
  components:{
  	SIdentify
  },
  methods: {
    login() {
    	var $$this=this;
    	$$this.logindisabled=true;
    	if($$this.name.length<1){
    		wx.showToast({title:"用户或手机号不能为空",duration: 2});
    		$$this.logindisabled=false;
    		return;
    	}
    	if($$this.password.length<1){
    		wx.showToast({title:"密码不能为空",duration: 2});
    			$$this.logindisabled=false;
    		return;
    	}
    	if($$this.code.length<1){
    		 wx.showToast({title: "验证码不能为空",duration: 2});
    			$$this.logindisabled=false;
    		return;
    	}
    	if($$this.name.length<6||$$this.password.length<6){
    		 wx.showToast({title:  "用户或密码错误",duration: 2});
    		 	$$this.logindisabled=false;
    		return;
    	}
    	if($$this.code.toUpperCase()!=$$this.identifyCode){
    		 wx.showToast({title: "请正确输入验证码",duration: 2});
    		 	$$this.logindisabled=false;
    		return;
    	}    	
    	
    	
      postLogin({ phone: $$this.name, password: $$this.password })
        .then(res => {
         	setToken(res.data.token, res.data.user_id)          
          wx.showToast({
            title: "登录成功",
            icon: "success",
            duration: 2000,
            complete:function(){
            	setTimeout(function(){      
								wx.switchTab({url:'/pages/Chart/main'})
		          },2000)
            }
          });
         var head_url=res.data.head_url.indexOf('http://')>-1?res.data.head_url:'http://'+res.data.head_url;
         var nickname=res.data.nickname?res.data.nickname:"这是谁？"
          wx.setStorageSync('Head_url',head_url)
   			  wx.setStorageSync('Nickname',nickname)
        })
        .catch(e => {
         wx.showToast({title:e,duration: 2000});
        });
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes.split(""), 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += o[ this.randomNum(0, o.length) ];
      }
    }
  },
  onReady(){  	
  	this.refreshCode(); 
  	this.code=this.identifyCode
		wx.showTabBar();
  },

};
</script>
<style>
	.Logins{background: #f5f4f4;font-size:12px;padding-bottom:40px;}
	.Logins .topimg{width:100%;height:277px;}
	.Logins .topimg img{height:277px;width:100%;display: block; margin: 0 auto;}
	.Logins ul{background-color:#FFFFFF;border-radius:5px;width:288px;margin: -40px auto 8px;padding:17.5px;position: relative;z-index:1;}
	.Logins ul li{padding:17px 0;}
	.Logins ul li h4{ line-height:14px;color:#323232; font-size:14px;}
	.Logins ul li input{height:32px; line-height:32px; width:280px; padding:4px;border:0;background-color:#f0f0f0; color:#323232;border-radius:2.5px; font-size:14px;}
	.Logins ul li .scanvas{float: right; width:90px; height:45px;display: block}
	.Logins ul li .scanvas canvas{width:88px; height:32px; margin:4px auto;}
	.Logins ul li button{width:100%; height:32px; line-height: 32px; text-align: center; border-radius:14.4px;background-color:#f3d890; color: #6e5100;border:0; font-size:16px;}
	.Logins ul li.link{padding:4px;}
	.Logins ul li.link a{font-size:13px; color:#646464;}
	.Logins .bottoms{padding:17.5px 24px;margin:4px auto;line-height:26px;color:#6e5100; font-size:13px;}
	.Logins .bottoms a{color:#6e5100; }
	.Logins .bottoms span{float: left;}
	.Logins .bottoms span a{color:#ff7200;}
</style>


