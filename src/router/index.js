import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/animals/slider'
  },
  {
    path: '/animals/',
    component: Tabs,
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
      {
        path: 'chat',
        component: () => import('@/views/ChatCenter.vue')
      },

    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
