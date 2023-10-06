import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/AppLogin.vue'
import Restaurante from '../views/MenuRestaurante.vue'
import TelaCozinha from '../views/Cozinha.vue'
import Fechamento from '../views/Fechamento.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/restaurante',
      name: 'restaurante',
      component: Restaurante
    },
    {
      path: '/cozinha',
      name: 'cozinha',
      component: TelaCozinha
    },
    {
      path: '/fechamento',
      name: 'fechamento',
      component: Fechamento
    }
  ]
})

export default router
