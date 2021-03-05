import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsAnimals from '../views/TabsAnimals.vue'


const routes = [
  {
    path: '/',
    redirect: '/signin'
  },
  {
    path: '/main/',
    component: TabsAnimals,
    children: [
      {
        path: '',
        redirect: '/main/slider'
      },
      {
        path: 'slider',
        name: 'slider',
        component: () => import('@/views/AnimalSlider.vue')
      },
      {
        path: 'liked-animals',
        name: 'liked-animals',
        component: () => import('@/views/FavouriteAnimals.vue')
      },
      {
        path: 'admin-animals',
        name: 'admin-animals',
        component: () => import('@/views/AdminAnimals.vue')
      }
    ]
  },
  {
    path: '/filters',
    name: 'filters',
    component: () => import('@/views/SearchAnimals.vue')
  },
  {
    path: '/report/:id',
    name: 'report-animal',
    component: () => import('@/views/ReportAnimal.vue')
  },
  {
    path: '/form',
    name: 'animal-form',
    component: () => import('@/views/AddNewAnimal.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/EditProfile.vue')
  },
  {
    path: '/firststeps',
    name: 'first-steps',
    component: () => import('@/views/FirstSteps.vue')
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('@/views/SignUpView.vue')
  },
  {
    path: '/signin',
    name: 'login',
    component: () => import('@/views/SignInView.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
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
