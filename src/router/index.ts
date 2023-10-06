import {createRouter, createWebHistory} from 'vue-router'
import Cabinet from '@/views/Cabinet.vue';
import LoginPage from '@/views/LoginPage.vue';
import {useLoginStore} from "@/stores/login.js";

const router =  createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/cabinet'
    },
    {
      path: '/cabinet',
      name: 'cabinet',
      component: Cabinet,
      beforeEnter(to, from, next): void {
        const store = useLoginStore()
        store.isLogin ? next() : next('/login')
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
  ]
})

export default router
