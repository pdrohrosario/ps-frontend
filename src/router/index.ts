import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CadastroView from '../views/CadastroView.vue'
import PesquisaView from '../views/pesquisaView.vue'
import PerfilUsuarioView from '../views/perfilUsuarioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component:CadastroView
    },
    {
      path: '/home',
      name: 'home',
      component:HomeView
    },
    {
      path: '/professores',
      name: 'professores',
      component:PesquisaView
    },
    {
      path: '/pais',
      name: 'pais',
      component:PesquisaView
    },
    {
      path: '/perfil',
      name: 'perfil',
      component:PerfilUsuarioView
    }
  ]
})

export default router
