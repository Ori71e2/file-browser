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
      redirect: 'map'
      // children: [
      //   {
      //     path: 'map',
      //     component: () => import('@/views/map/index'),
      //     name: 'Map',
      //     meta: { title: 'Map', icon: 'Map', affix: true }
      //   }
      // ]
    },
    {
      path: '/map',
      component: Layout,
      redirect: '/map/index',
      name: 'Map',
      alwaysShow: true,
      meta: {
        title: 'Map',
        icon: 'map'
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/map/index'),
          name: 'index',
          meta: {
            title: 'index',
            icon: 'map'
          }
        }
        // {
        //   path: 'test',
        //   component: () => import('@/views/map/test'),
        //   name: 'test',
        //   meta: {
        //     title: 'test',
        //     icon: 'map'
        //   }
        // },
        // {
        //   path: 'test2',
        //   component: () => import('@/views/map/test2'),
        //   name: 'test2',
        //   meta: {
        //     title: 'test2',
        //     icon: 'map'
        //   }
        // }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
