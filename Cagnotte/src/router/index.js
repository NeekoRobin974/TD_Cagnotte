import { createRouter, createWebHistory } from 'vue-router'
import Cagnottes from '@/views/Cagnottes.vue'
import CreerCagnotte from "@/views/CreerCagnotte.vue";
import CagnotteDetails from "@/views/CagnotteDetails.vue";
import CagnotteInfos from "@/views/CagnotteInfos.vue";
import ModifierCagnotte from "@/views/ModifierCagnotte.vue";
import Donations from "@/views/Donations.vue";

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
      component: CagnotteDetails,
      redirect: to => `/cagnottes/${to.params.id}/infos`,
      children: [
        {
          path: 'infos',
          name: 'cagnotte-infos',
          component: CagnotteInfos
        },
        {
          path: 'donations',
          name: 'cagnotte-donations',
          component: Donations
        }
      ]
    },
    {
      path: '/cagnottes/:id/edit',
      name:"modifierCagnotte",
      component: ModifierCagnotte,
    }
  ],
})

export default router
