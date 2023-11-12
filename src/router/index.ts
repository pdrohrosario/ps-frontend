import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import CadastroView from '@/views/CadastroView.vue'
import PesquisaPaisView from '@/views/PesquisaPaisView.vue'
import PerfilUsuarioView from '@/views/PerfilUsuarioView.vue'
import FeedbackRequestView from '@/views/FeedbackRequestView.vue'
import FeedbackResponseView from '@/views/FeedbackResponseView.vue'
import PesquisaProfessorView from '@/views/PesquisaProfessorView.vue'

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
      component: CadastroView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pais',
      name: 'pais',
      component: PesquisaPaisView
    },
    {
      path: '/professores',
      name: 'professores',
      component: PesquisaProfessorView
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: PerfilUsuarioView
    },
    {
      path: '/feedback/solicitacao',
      name: 'solicitar-feedback',
      component: FeedbackRequestView
    },
    {
      path: '/feedback/resposta',
      name: 'responder-feedback',
      component: FeedbackResponseView
    }
  ]
})

export default router
