import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component:(resolve) => require(['@/components/views/login'],resolve)
    },
    {
      path:'/layout',
      redirect:'/articleDetail'
    },
    {
      path: '/layout',
      name: 'Home',
      component:(resolve) => require(['@/components/lay/Layout.vue'],resolve),
      children:[
        {
          path:"/articleDetail",
          name:'articleDetail',
          component:(resolve => require(['@/components/views/articleDetail.vue'],resolve)),
          meta:{
            title:'文章详情'
          }
        },
      ]
    }
  ]
})


router.beforeEach((to,from,next) => {
  if(to.path == '/login'){
    sessionStorage.clear();
  }
  const role = sessionStorage.getItem('token');
  if(!role && to.path !== '/login'){
    next('/login')
  }
  else{
    next()
  }
  next()
});


export default router;
