import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
// import 'bootstrap' // Import js file
// import 'bootstrap/dist/css/bootstrap.min.css' // Import css file
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Loading from 'vue-loading-overlay' // component
import 'vue-loading-overlay/dist/vue-loading.css' // style
// vue-loading-overlay
Vue.use(Loading) // Use default options
Vue.component('Loading', Loading)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
