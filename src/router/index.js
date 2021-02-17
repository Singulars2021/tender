import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsAnimals from '../views/TabsAnimals.vue'
import TabsSign from "../views/TabsSign.vue"

const routes = [
  {
    path: '/',
    redirect: '/animals/slider'
  },
  {
    path: '/animals/',
    component: TabsAnimals,
    children: [
      {
        path: '',
        redirect: '/animals/slider'
      },
      {
        path: 'slider',
        component: () => import('@/views/AnimalSlider.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/AddNewAnimal.vue')
      },
    ]
  },
  {
    path: '/sign/',
    component: TabsSign,
    children: [
      {
        path: '',
        redirect: '/sign/singup'
      },
      {
        path: 'signup',
        component: () => import('@/views/SignUpView.vue')
      },
      {
        path: 'signin',
        component: () => import('@/views/LogIn.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
