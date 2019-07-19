import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/blog/home'
    },
    {
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/views/home/index.vue'],resolve),
      // redirect: 'blog/home',
      children:[
        {
          path:'blog/home',
          component: (resolve) => require(['@/views/home/home.vue'],resolve),
        },
        {
          path:'blog/about',
          component: (resolve) => require(['@/views/home/about.vue'],resolve),
        },
        {
          path:'blog/tags',
          component: (resolve) => require(['@/views/home/tags.vue'],resolve),
        },
        {
          path:'blog/:id',
          name:'blog',
          component: (resolve) => require(['@/views/home/blog.vue'],resolve),
        },
      ]
    }
  ]
})
