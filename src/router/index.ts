import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'
import PesquisaView from '@/views/PesquisaView.vue'
import PerfilUsuarioView from '@/views/PerfilUsuarioView.vue'
import FeedbackRequestView from '@/views/FeedbackRequestView.vue'
import FeedbackResponseView from '@/views/FeedbackResponseView.vue'

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
    },
    {
      path: '/solicitar-feedback',
      name: 'solicitar-feedback',
      component:FeedbackRequestView
    },
    {
      path: '/responder-feedback',
      name: 'responder-feedback',
      component:FeedbackResponseView
    }
  ]
})

export default router
