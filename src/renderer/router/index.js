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
    {
      path: '/',
      component: Layout,
      redirect: 'test',
      children: [
        {
          path: 'test',
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
