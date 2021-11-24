import { createRouter, createWebHashHistory } from "vue-router"
import NotFoundPage from '../modules/shared/views/NotFoundPage'
import authRouter from '../modules/auth/router'
import lotteryRouter from '../modules/lottery/router'

const routes = [
    { 
      path: '/',
      redirect:{name:'login-page'}
     
    },
    {
      path: '/login',
      ...authRouter
    },
    { 
      path: '/lottery',
      ...lotteryRouter     
      
    },
    { 
      path: '/:pathMatch(.*)*',
      component: NotFoundPage
    
    },
  ]

const router = createRouter({    
    history: createWebHashHistory(),
    routes, 
  })

export default router