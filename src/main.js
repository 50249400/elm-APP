// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/HelloFromVux'
import Index from './pages/Index'
import Find from './pages/Find'
import OrderForm from './pages/OrderForm'
import Mine from './pages/Mine'
import detailPage from './pages/detailPage'
import jiesuan from './pages/jiesuan'
import vueResource from 'vue-resource'
import store from './store'

Vue.use(VueRouter)
Vue.use(vueResource)

const routes = [{
  path: '/',
  component: Home,
  redirect: '/index'
},
{
  path: '/index',
  component: Index
},
{
  path: '/find',
  component: Find
},
{
  path: '/orderform',
  component: OrderForm
},
{
  path: '/mine',
  component: Mine
},
{
  path: '/detailPage',
  component: detailPage
},
{
  path: "/jiesuan",
  component: jiesuan
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
