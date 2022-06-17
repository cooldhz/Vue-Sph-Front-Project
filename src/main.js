import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入Vuex仓库
import store from './store'
// 注册全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
// 按需引入弹出框
import { MessageBox } from 'element-ui';
Vue.component(TypeNav.name, TypeNav)  //  第一个参数： 组件的名称，第二个参数：注册组件的对象
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入mock 执行mock代码
import '@/mock/mockServe'
// 引入Swiper 样式
import 'swiper/css/swiper.min.css'
// 统一引入接口文件
import * as API from '@/api'
// 引入懒加载
import VueLazyload from 'vue-lazyload'
import loadingImg from '@/assets/1.gif'
Vue.use(VueLazyload, {
  loading: loadingImg,
})
// 引入表单验证插件
import '@/plugins/validata'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API

    // 按需使用element-ui
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  }
}).$mount('#app')
