import Vue from 'vue'
import App from './App.vue'
import store from './store'
// Element ui
import Element from 'element-ui'
import './element-variables.scss'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
