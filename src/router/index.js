import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsAnimals from '../views/TabsAnimals.vue'


const routes = [
  {
    path: '/',
    redirect: '/signin'
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
        name: 'slider',
        component: () => import('@/views/AnimalSlider.vue')
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
    path: '/report/:id',
    component: () => import('@/views/ReportAnimal.vue')
  },
  {
    path: '/contactinfo/:idUser',
    name: 'contact-info',
    component: () => import('@/views/ContactInfo.vue')
  },
  {
    path: '/form',
    component: () => import('@/views/AddNewAnimal.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/EditProfile.vue')
  },
  {
    path: '/firststeps',
    component: () => import('@/views/FirstSteps.vue')
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
    path: '/forgot-password',
    component: () => import('@/views/ForgotPassword.vue')
  },
  {
    path: '/editanimal/:id',
    name: 'EditAnimal',
    component: () => import('@/views/AddNewAnimal.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
