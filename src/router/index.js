import Vue from 'vue'
import Router from 'vue-router'
import Readit from '@/components/Readit'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'Readit',
      component: Readit,

    }
  ],
  mode: 'history'
})
