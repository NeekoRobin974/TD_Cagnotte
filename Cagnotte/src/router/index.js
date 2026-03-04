import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '@/views/Cagnottes.vue'
import CreerCagnotte from "@/views/CreerCagnotte.vue";
import CagnotteDetails from "@/views/CagnotteDetails.vue";

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
    },
    {
      path: '/cagnottes/:id',
      name: 'cagnotte-details',
      component: CagnotteDetails
    }
  ],
})

export default router
