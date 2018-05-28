import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()
export default {
  config: {
    // 这儿添加要用的小程序组件
    usingComponents: {
      'ec-canvas': '../../static/ec-canvas/ec-canvas'
    }
  }
}