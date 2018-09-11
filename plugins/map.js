import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
import customMap from './customMap'
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'http://api.map.baidu.com/api?v=2.0&ak=6tYzTvGZSOpYB5Oc2YGGOKt8'
})
Vue.prototype.customMap = customMap
