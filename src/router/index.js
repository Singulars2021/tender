import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsAnimals from '../views/TabsAnimals.vue'


const routes = [
  {
    path: '/',
    redirect: '/animals/slider'
  },
  {
    path: '/adminanimals',
    component: () => import('@/views/AdminAnimals.vue')
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
      {
        path: 'liked-animals',
        component: () => import('@/views/FavouriteAnimals.vue')
      },

    ]
  },
  {
    path: '/filters',
    component: () => import('@/views/SearchAnimals.vue')
  },
  {
    path: '/form',
    component: () => import('@/views/AddNewAnimal.vue')
  },
  {
    path: '/profile',
    component: () => import('@/views/EditProfile.vue')
  },
  {
    path: '/signup',
    component: () => import('@/views/SignUpView.vue')
  },
  {
    path: '/signin',
    name: 'login',
    component: () => import('@/views/SignInView.vue')
  },
  {
    path: '/chat/:id',
    props: true,
    component: () => import('@/views/Chat.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
