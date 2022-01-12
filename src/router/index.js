import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Video from '../views/Video.vue'
import Album from '../views/Album.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/video',
    name: 'Video',
    component: Video
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/songList',
    name: 'songList',
    component: () => import('../views/songList.vue')
  },
  {
    path: '/topList',
    name: 'topList',
    component: () => import('../views/topList.vue')
  },
  {
    path: '/Radio',
    name: 'radio',
    component: () => import('../views/Radio.vue')
  },
  {
    path: '/Search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/UserInfo',
    name: 'userinfo',
    component: () => import('../views/UserInfo.vue'),
    beforeEnter:(to,from,next)=>{
      let login = window.localStorage.getItem("token");
      // 判断没有值
      if(!login){
        next("Login");
        return;
      }else{
        next();
      }
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/Register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/Detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue'),
  },
  {
    path: '/AlbumDeatil',
    name: 'AlbumDeatil',
    component: () => import('../views/AlbumDeatil.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
