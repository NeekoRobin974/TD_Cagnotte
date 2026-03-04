import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '@/views/Cagnottes.vue'
import CreerCagnotte from "@/views/CreerCagnotte.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect: '/cagnottes'
    },
    {
      path:'/cagnottes',
      name:"cagnottes",
      component:Cagnottes
    },
    {
      path:'/cagnottes/new',
      name:"newcagnotte",
      component:CreerCagnotte
    }
  ],
})

export default router
