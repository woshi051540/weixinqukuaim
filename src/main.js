import Vue from 'vue'
import App from './App'


Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: [ '^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#eacd80',
      navigationBarTitleText: '区块猫',
      navigationBarTextStyle: 'white'
    },
    "debug": false,
    "tabBar":{
    	color:"#aa8a2f",
    	selectedColor:"#fa9e03",
    	backgroundColor:"#fee9b1",
    	borderStyle:"white",
    	list:[
    		{pagePath:"pages/Chart/main",text:"涨跌图",iconPath:"./static/assets/nav-home33.png",selectedIconPath:"./static/assets/nav-home33-s.png"},
    		{pagePath:"pages/Aeal/main",text:"交易中心",iconPath:"./static/assets/nav-Aeal33.png",selectedIconPath:"./static/assets/nav-Aeal33-s.png"},
    		{pagePath:"pages/Shop/main",text:"商店",iconPath:"./static/assets/nav-Shop33.png",selectedIconPath:"./static/assets/nav-Shop33-s.png"},
    		{pagePath:"pages/Myhome/main",text:"我的",iconPath:"./static/assets/nav-Myhome33.png",selectedIconPath:"./static/assets/nav-Myhome33-s.png"}
    	]
    }
  }
}
