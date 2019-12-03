import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   component: require('@/layout/index').default
    // },
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: 'index',
          component: () => import('@/views/test/index'),
          name: 'Test',
          meta: { title: 'Test', icon: 'test', affix: true }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
