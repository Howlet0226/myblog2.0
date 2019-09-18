import Router from 'vue-router'
import blogList from '../pages/bloglist/index.vue'
// import blogContent from '../pages/blogcontent/index.vue'
// import blogManage from '../pages/blogmanage/index.vue'
// import addBlog from '../pages/addblog/index.vue'
// import login from '../pages/login/index.vue'
import Vue from 'vue'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
let viewfn = (viewcom)=>{
  return import(`../pages/${viewcom}/index.vue`)
}
export default new Router({
  routes:[
    {
      path:'/',
      name:'blogList',
      component:blogList
    },{
      path:'/blogcontent:id',
      name:'blogContent',
      component:()=>{
        return viewfn('blogcontent')  
      }
    },{
      path:'/blogmanage',
      name:'blogmanage',
      component: () =>import(/* webpackPrefetch: true */ '../pages/blogmanage/index.vue')
    },{
      path:'/addblog',
      name:'addblog',
      component: () =>import(/* webpackPrefetch: true */'../pages/addblog/index.vue')
    },{
      path:'/login',
      name:'login',
      component: () =>import(/* webpackPrefetch: true */'../pages/login/index.vue')
    },{
      path:'/uploadmd',
      name:'uploadmd',
      component: () =>import(/* webpackPrefetch: true */'../pages/blogmanage/index.vue')
    }
  ]
})